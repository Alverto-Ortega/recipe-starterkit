# Recipe Starter Kit

Welcome to the Recipe Starter Kit! This project is built with Vite, React, CSS Modules, GraphQL, and the NEON stack. It allows users to add and view recipes in real-time.

## Features

- Add new recipes
- View all recipes
- Real-time updates using GraphQL subscriptions

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Alverto-Ortega/recipe-starterkit.git
   cd recipe-starterkit

2. Install dependencies:

    npm install

3. Create a .env file in the root directory and add your PostgreSQL credentials from your Neon account:
   
    PGHOST=your_host
   
    PGDATABASE=your_database
   
    PGUSER=your_user
   
    PGPASSWORD=your_password
   
    PORT=4000

4. Start the development server:

    npm run dev

5. Usage

    Open your browser and navigate to http://localhost:5173
    The GraphQL API is available at http://localhost:4000/graphql.
    Use the navigation bar to switch between Home, About, and Recipes pages.
    Add new recipes using the form on the Recipes page.
    
## Technologies Used

    Frontend:
        Vite
        React
        CSS Modules

    Backend:
        Express
        Apollo Server
        GraphQL
        PostgreSQL

    Real-time:
        GraphQL Subscriptions
        WebSocket


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
License

## License
This project is licensed under the MIT License. See the LICENSE file for details.

© 2024 Alverto Ortega


### Documentation

#### Overview

This project is a recipe management application that allows users to add and view recipes. It uses a modern web stack including Vite, React, CSS Modules, GraphQL, and PostgreSQL.

#### Key Components

1. **Frontend**:
   - **Vite**: A fast build tool for modern web projects.
   - **React**: A JavaScript library for building user interfaces.
   - **CSS Modules**: A CSS file in which all class and animation names are scoped locally by default.

2. **Backend**:
   - **Express**: A minimal and flexible Node.js web application framework.
   - **Apollo Server**: A community-driven, open-source GraphQL server.
   - **GraphQL**: A query language for your API.
   - **PostgreSQL**: A powerful, open-source object-relational database system.

3. **Real-time**:
   - **GraphQL Subscriptions**: Enables real-time updates.
   - **WebSocket**: A protocol for full-duplex communication channels over a single TCP connection.

#### Code Explanation

1. **Server Configuration (`server.js`)**:
   - Sets up the Express server.
   - Configures the PostgreSQL connection pool.
   - Initializes Apollo Server with GraphQL schema and resolvers.
   - Sets up WebSocket for GraphQL subscriptions.

2. **GraphQL Schema (`schema.js`)**:
   - Defines the GraphQL types, queries, mutations, and subscriptions.

3. **GraphQL Resolvers (`resolvers.js`)**:
   - Implements the logic for fetching and manipulating data in response to GraphQL queries and mutations.
   - Uses PostgreSQL for data storage and retrieval.

4. **Database Utility (`databaseUtils.js`)**:
   - Provides a utility function to manage PostgreSQL database connections.

5. **Frontend Components**:
   - **App.jsx**: Sets up the React Router and defines the main routes.
   - **Home.jsx, Recipes.jsx, About.jsx**: Define the different pages of the application.
   - **addRecipe.jsx, recipeList.jsx**: Handle adding new recipes and displaying the list of recipes.

6. **Apollo Client Setup (`main.jsx`)**:
   - Configures Apollo Client for GraphQL queries and subscriptions.
   - Sets up HTTP and WebSocket links for Apollo Client.

7. **Vite Configuration (`vite.config.js`)**:
   - Configures Vite for the project, including React plugin and CSS Modules.
