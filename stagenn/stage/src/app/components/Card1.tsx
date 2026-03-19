import { FC, ReactNode, useEffect } from 'react';

interface Props {
  title: string;
  content: ReactNode;
  footer?: string;
  codeExample?: string;
}

const Card1: FC<Props> = ({ title, content, codeExample, footer }) => {

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
        <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
      </div>

      {/* Card Body */}
      <div className="p-8">
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          {content}
          {/* React est une bibliothèque JavaScript développée par Meta Platforms pour construire des interfaces utilisateur (UI) dynamiques et réactives. Elle est principalement utilisée pour créer des applications web à une seule page. */}
        </p>

        <p className="text-gray-700 text-lg leading-relaxed text-justify mt-4">
          {/* Components : Les applications sont construites à partir de blocs d'interface utilisateur réutilisables appelés composants (Components).<br/>
            JSX : est une extension syntaxique de JavaScript qui permet d’écrire du code similaire au HTML directement dans JavaScript afin de décrire l’interface utilisateur dans React et Next.js.<br/>
            Props (Propriétés) : C’est une façon de transmettre des données d’un composant parent (Parent) à un composant enfant (Child) pour permettre la communication entre les composants et les rendre dynamiques (adaptables selon les données). */}
        </p>

        {codeExample && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Example Code
            </h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm whitespace-pre">{codeExample}</code>
            </div>
          </div>
        )}

        {/* Badge */}
        {footer &&(
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            {footer}
            {/* JavaScript Library */}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Card1;
