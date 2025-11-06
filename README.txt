Current Issues:
	- .sql files in the repo are binary and can't be run directly
	- environmental variables being stored in ~/.bashrc instead of a .env

Prerequisites:
	- Docker + Docker Compose
	- Git
	- Google OAuth Client ID/Secret (from Google Cloud Console)
	- Git repo cloned to local machine
	- Git bash or other Linux CLI


Open the project ROOT in command line:
	Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in ~/.bashrc (will be moved to an env variable in future)
	Add these 2 lines of code to ~/.bashrc:
		export GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
		export GOOGLE_CLIENT_SECRET=your-client-secret

With the ID and SECRET set in ~/.bashrc, in command line, from the root folder, run: 
	source ~./bashrc

Check that the environmental variables were set properly using:
	echo $GOOGLE_CLIENT_ID
	echo $GOOGLE_CLIENT_SECRET
The echo commands should generate output if they were properly set. Blank output if not.

With Docker running, run: 
	docker-compose up --build
	--TAKES A WHILE ON FIRST BUILD--


With a successful launch of the containers, each service can be reached at:
	- Frontend: http://localhost:3000
	- pgAdmin: http://localhost:5050
	- Auth-service API: localhost:8001
	- User-service API: localhost:8002


For logging into pgAdmin to view db entries:
	Email: admin@example.com
	Password: letmein

Add server:
	Host: db
	Port: 5432
	Username: redcross_user
	Password: redcross_pass

Create a table:

CREATE TABLE "Profile" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(75) UNIQUE NOT NULL,
    "FName" VARCHAR(50),
    "LName" VARCHAR(50),
    role VARCHAR(12) NOT NULL,
    status VARCHAR(25),
    phone VARCHAR(12) NOT NULL
);