"use client"
import { useEffect, useState,useCallback,useMemo } from 'react';
import Card1 from './components/Card1';






export default function HomePage() {
  const[aa,setAa]=useState(1)
  useEffect(()=>{
    console.log("hello")
  },[aa])
  return (
    


  

    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen grid gap-8 items-center justify-center p-6">
      {/* Card 1: What is React? */}

      <Card1
        title="React basic"
        content={
          <>
            {' '}
            React est une bibliothèque JavaScript développée par Meta Platforms
            pour construire des interfaces utilisateur (UI) dynamiques et
            réactives. Elle est principalement utilisée pour créer des
            applications web à une seule page. <br />
            Components : Les applications sont construites à partir de blocs
            d'interface utilisateur réutilisables appelés composants
            (Components).
            <br />
            JSX : est une extension syntaxique de JavaScript qui permet d’écrire
            du code similaire au HTML directement dans JavaScript afin de
            décrire l’interface utilisateur dans React et Next.js.
            <br />
            Props (Propriétés) : C’est une façon de transmettre des données d’un
            composant parent (Parent) à un composant enfant (Child) pour
            permettre la communication entre les composants et les rendre
            dynamiques (adaptables selon les données).{' '}
          </>
        }
        footer="avaScript Library"
      />

      {/* Card 2: Data Fetching */}

      <Card1
        title="Data Fetching "
        content={
          <>
            {' '}
            Data Fetching signifie récupérer des informations depuis un serveur
            (Server) ou une base de données (Database) puis les afficher dans
            l’interface utilisateur (UI) de l’application.
            <br /> En d’autres termes :
            <br /> l’application envoie une demande de données ➜ le serveur
            répond ➜ les données sont affichées à l’utilisateur. "
          </>
        }
        footer=" React Framework"
        codeExample={`import { useEffect, useState } from "react";

export default function Example() {
  // On crée un state pour stocker les données
  const [data, setData] = useState(null);

  // useEffect pour récupérer les données au chargement du composant
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1") // URL de l'API
      .then((res) => res.json()) // On transforme la réponse en JSON
      .then((result) => setData(result)); // On stocke les données dans le state
  }, []); // Tableau vide signifie que ça s'exécute une seule fois au chargement

  return (
    <div>
      <h1>Exemple de récupération de données</h1>
      {/* Si les données existent, on affiche le titre, sinon on affiche "Chargement..." */}
      {data ? <p>{data.title}</p> : <p>Chargement...</p>}
    </div>
  );
}

}`}
      />

      {/* Card 3: What is Next.js? */}
      <Card1
        title="What is Next.js?"
        content="  Next.js est un framework basé sur React qui permet de créer des sites web et des applications web facilement, sans complexité."
      />

      <Card1
        title="App Router"
        content={
          <>
            {' '}
            Next.js App Router est un système de routage moderne dans Next.js,
            qui repose sur une structure basée sur les dossiers (folders) pour
            définir les pages. Il a été construit en utilisant les dernières
            fonctionnalités de React,
          </>
        }
        footer="Modern Routing System"
        codeExample={`app/
 ├── layout.tsx
 ├── page.tsx
 ├── about/
 │     └── page.tsx
`}
      />

      {/* Card 5: SSR / SSG */}
      <Card1
        title=" SSR – Server Side Rendering"
        content=" SSR est une technique qui permet de générer la page côté serveur à chaque requête afin d’améliorer la performance et le référencement ."
        footer=" Performance & SEO"
        codeExample={`export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();

  return {
    props: { post: data },//deviennent post dans la page
  };
}

export default function Page({ post }) {
  return (
    <div>
      <h1>SSR Example</h1>
      <p>{post.title}</p>
    </div>
  );


}`}
      />

      {/* Card 6 */}

      <Card1
        title="API Routes"
        content=" Une API Route Next.js est un point de communication sécurisé et structuré 
            entre le front-end et le back-end, permettant la manipulation et la 
            transmission de données via HTTP.
             Elle permet de créer des endpoints directement dans ton projet Next.js 
            sans avoir besoin d’un serveur backend séparé."
        codeExample={`// app/api/hello/route.ts

          import { NextResponse } from "next/server";

                    export async function GET() {
            return NextResponse.json({
              message: "Hello from API Route!"
            });
          }

          
          `}
        footer=" Fetch depuis le Frontend"
      />

      {/* Card 6: Layout dans Next.js 13+ */}

      <Card1
        title="Layout dans Next.js "
        content={
          <>
            {' '}
            Un Layout est un composant React partagé qui définit la structure
            fixe d’un site, comme le Header, le Footer ou la Sidebar.
            <br />• <strong>Réduit la répétition</strong> : pas besoin de
            réécrire Header/Footer sur chaque page.
            <br />• <strong>Améliore la performance</strong> : seule la partie{' '}
            <code>children</code> change entre les pages.
            <br />• <strong>Layouts imbriqués</strong> : chaque dossier peut
            avoir son propre layout spécifique.{' '}
          </>
        }
        codeExample={`// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header style={{ background: "black", color: "white", padding: 20 }}>
          <h1>Mon Site</h1>
        </header>

        <main>{children}</main>

        <footer style={{ background: "gray", padding: 20 }}>
          © 2026 Mon Site
        </footer>
      </body>
    </html>
  );
}`}
        footer="Structure Globale & Réutilisable"
      />

      {/* Card 7: TanStack Start */}

      <Card1
        title="TanStack Start"
        content="TanStack Start est un framework full-stack moderne avec des fonctionnalités serveur optionnelles. Typé en TypeScript, il facilite le développement d’applications performantes et maintenables, et se positionne comme un concurrent flexible de Next.js."
        footer="Full-stack & TypeScript"
      />

      {/* Card 7: TanStack Query */}
      <Card1
        title="TanStack Query"
        content="  TanStack Query est une bibliothèque pour React qui permet de récupérer les données depuis le serveur et de les gérer automatiquement, en prenant en charge le cache, le rafraîchissement et la gestion des erreurs. "
        codeExample={`import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

// Créer un client
const queryClient = new QueryClient();

// Composant qui récupère les données
function Users() {
  const { data, isLoading, isError } = useQuery(["users"], () =>
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json())
  );

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur !</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// App principal
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Liste des utilisateurs</h1>
      <Users />
    </QueryClientProvider>
  );
}
/>;
}
`}
        
      />

      {/* Card: TanStack Router */}
      <Card1
        title="  TanStack Router"
        content={
          <div>
            {' '}
            TanStack Router est une bibliothèque de routage moderne pour React
            et TypeScript qui permet de gérer la navigation entre les pages
            d’une application de manière puissante, flexible et fortement typée.
            Gestion des routes statiques et dynamiques.
            <br />
            • Support des routes imbriquées (nested routes).
            <br />
            • Chargement des données avant affichage grâce aux loaders.
            <br />• Intégration native avec TypeScript pour éviter les erreurs.
            "
          </div>
        }
        codeExample={`// App.tsx
import React from "react";
import { RouterProvider, createRouter, Route } from "@tanstack/react-router";

function Home() {
  return <h1>Accueil</h1>;
}

function About() {
  return <h1>À propos</h1>;
}

const router = createRouter({
  routes: [
    new Route({ path: "/", component: Home }),
    new Route({ path: "/about", component: About }),
  ],
});

export default function App() {
  return <RouterProvider router={router} />;
}
`}
        
      />




           <Card1
        title="comparaison entre tanstack query et axios"
        content={
          <>
            {' '}
            <strong>TanStack Query</strong><br/>
            <strong>Type</strong> : Bibliothèque de gestion des états liés aux données côté client (Data Fetching + Cache).
            <br />
            <strong>Usage principal : </strong>Gérer la récupération, le cache, la synchronisation et la mise à jour des données dans une app React ou Next.js.
            <br />
           <strong> Fonctionnalités clés :</strong>
                Gestion automatique du cache.<br/>
                Gestion des états de chargement et d’erreur.<br/>
                <strong>Points forts :</strong>

                  Évite de refaire les requêtes si les données sont déjà dans le cache.<br/>

                  Très pratique pour les apps complexes avec beaucoup d’interactions.<br/>

                  S’intègre bien avec Axios pour les requêtes HTTP.<br/>

                    <strong>Points faibles :</strong>

                    Ajoute une couche supplémentaire, un peu plus complexe à configurer.<br/>

                      Spécifique à React ou frameworks compatibles.<br/>


                      <strong>Axios</strong><br/>

                  <strong>Type</strong> : Bibliothèque HTTP (client de requêtes).<br/>

                   <strong>Usage principal </strong> : Faire des requêtes HTTP vers un serveur ou une API (GET, POST, PUT, DELETE…).<br/>

                    <strong>Fonctionnalités clés :</strong>

                      Gestion des requêtes et des réponses HTTP.<br/>
                        Support des headers, tokens, et interceptors.<br/>

                  Compatible avec Node.js et navigateur.<br/>

                   <strong>Points forts :</strong> 

                  Léger, simple à utiliser pour des requêtes simples.<br/>

                    Très flexible, peut être utilisé partout dans ton code.<br/>

                      <strong>Points faibles :</strong>

                Pas de gestion automatique du cache ou des états (loading, error, success).<br/>

                Tu dois gérer toi-même les rechargements ou la synchronisation des données.<br/>
          </>
        }
        
      />

        <Card1
        title="react state"
        content={
          <>
            {' '}
            
               Le state (état) en React est un objet ou une variable locale à un composant qui stocke des données dynamiques susceptibles d'évoluer au fil du temps,
                comme la saisie d'un utilisateur ou le résultat d'une API. Lorsqu'il est modifié,
                 le composant est automatiquement réaffiché (re-render) pour mettre à jour l'interface utilisateu.{' '}
          </>
        }
        
      />


<Card1
        title="React Hook"
        content={
          <>
            {' '}
            <strong> React Hook </strong>

    Un Hook est une fonction spéciale de React qui permet aux composants fonctionnels de gérer l’état (state) et le cycle de vie des composants,
   fonctionnalités qui étaient auparavant réservées aux composants de classe.{' '}
   useState → gérer le state dans un composant fonctionnel.<br/>
   <strong>Exemples de Hooks principaux</strong><br/>

     <strong>useEffect</strong> → exécuter du code lors du montage, mise à jour ou démontage d’un composant.<br/>

     <strong>useContext</strong>  → accéder à un contexte React (données partagées entre composants).<br/>

        <strong>useState </strong> → Permet de gérer et de stocker localement des données dynamiques au sein d’un composant React..<br/>
          </>
        }
        
      />




    </div>
     
  );
}
