  1. Clone the Repository
      git clone https://github.com/Y-Hiriejhha-Dharini/support_ticket_managing_system.git

    **For Backend**
  2. Navigate to the backend folder:
      cd support_system_backend
  3. Install dependencies:
      composer update
  4. Change the environment file:
      Change the '.env.example' file as '.env'
      Create support_system_backend database on the db server
      Run 'JWT_SECRET=your-secret-key' command in the terminal to generate a jwt secret key
  6. Generate the application key:
      php artisan key:generate
  7. Run the development server:
      run composer run dev || php artisan serve

    **For Frontend**
  7. Navigate to the frontend folder:
      cd ../support_system_frontend
  8. Install dependencies:
      npm install
  9. Start the frontend:
      npm run dev

  10. Run the following command inside the backend folder:
      php artisan migrate --seed

  11. You can view project screenshots in the support_service_ss folder. 
