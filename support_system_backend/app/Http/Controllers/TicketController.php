<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Controllers\Controller;
use App\Http\Requests\TicketCreateRequest;
use App\Mail\CustomerSolution;
use App\Mail\TicketConfirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search','');
        $per_page = 10;

        $tickets = $this->getTicket($search, $per_page);

        return $this->successResponse('Tickets Data', $tickets);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TicketCreateRequest $request)
    {
        try{

            DB::beginTransaction();

            $referenceNumber = $this->gerenrateReferenceNumber();

            $ticket = Ticket::create(array_merge($request->validated(), ['reference'=>$referenceNumber]));
            $this->confiramationEmail($ticket->email, $ticket->reference);

            DB::commit();
            return $this->successResponse('Ticket Stored Successfully', [
                'reference_number' => $referenceNumber
            ]);

        }catch(Throwable $e)
        {
            DB::rollBack();
            Log::error('ticket creation error '.$e->getMessage());

            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        return $this->successResponse('Ticket Data', $ticket);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TicketCreateRequest $request, Ticket $ticket)
    {
        $validated_ticket = $request->validated();
        $ticket->update($validated_ticket);

        if($validated_ticket['problem_solution'] != null){
            $this->solutionEmail($ticket->email, $validated_ticket['problem_solution'], $ticket->reference);
        }

        return $this->successResponse('Updated Successfully');
    }

    public function reference($reference)
    {
        try{

            $reference_data = $this->getTicketByReference($reference);
            if(!$reference_data){
                return $this->errorResponse('Reference Number Not found', 404);
            }

            return $this->successResponse('Reference Number found', $reference_data);

        }catch(Throwable $e){

            Log::error('Reference Error is'. $e->getMessage());
            return $this->errorResponse($e->getMessage());
        }
    }

    public function ticket_read(Ticket $ticket)
    {
        $ticket->update([
            'read_unread' => 1
        ]);
        return $this->successResponse('Ticket read status updated', $ticket);
    }

    private function getTicket($search, $per_page){

        return Ticket::where('customer_name', 'LIKE','%'.$search.'%')
                ->select('id','customer_name','problem_description','email','phone_number','problem_solution','read_unread')
                ->orderBy('id','desc')
                ->paginate($per_page);
    }

    private function solutionEmail($email, $problem_solution, $reference)
    {
        Mail::to($email)->send(new CustomerSolution($problem_solution, $reference));
    }

    private function confiramationEmail($email, $reference)
    {
        Mail::to($email)->send(new TicketConfirmation($reference));
    }

    private function getTicketByReference($reference){

            return Ticket::where('reference', $reference)
                ->select('customer_name', 'email', 'phone_number', 'problem_description', 'problem_solution')
                ->first();
    }

    private function gerenrateReferenceNumber() :string
    {
        return'REF-'. Str::random(10);
    }

    private function successResponse(string $message, $data=[], int $status = 200)
    {
        return response()->json([
            "status" => 'success',
            "message" => $message,
            "data" => $data
        ], $status);
    }

    private function errorResponse(string $message, int $status = 500)
    {
        return response()->json([
            "status" => 'error',
            "message" => $message
        ], $status);
    }
}
