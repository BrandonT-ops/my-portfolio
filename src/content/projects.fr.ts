import type { ProjectText } from "@/content/types";

/** Texte français de chaque projet, par slug. Les chiffres viennent des CV de Brandon. */
export const projectsFr: Record<string, ProjectText> = {
  maguida: {
    summary: "Un moteur de recherche de produits intégrant l'IA, qui conseille les acheteurs de façon personnalisée.",
    role: "Développeur frontend",
    context:
      "Au Cameroun, les acheteurs n'avaient aucun moyen simple de chercher parmi les produits locaux et d'être conseillés sur quoi acheter.",
    approach: [
      "Développement du frontend en Next.js, avec une interface adaptative pour chercher et parcourir plus de 400 produits.",
      "Intégration de fonctions d'IA qui donnent des conseils d'achat personnalisés.",
      "Rendu côté serveur des pages clés avec Next.js, pour que les moteurs de recherche puissent les indexer.",
      "Travail avec l'équipe backend sur la mise en cache des réponses, pour garder la recherche et les recommandations IA rapides.",
      "Création d'une bibliothèque de composants réutilisables, pour un code léger et prêt à évoluer.",
    ],
    outcome:
      "Plus de 200 utilisateurs par mois. La satisfaction client a progressé d'environ 10 %, le temps de traitement des données a baissé de 20 % et les composants réutilisables ont réduit de 25 % le temps de développement frontend.",
    status: "Hors ligne : l'agence a mis fin à l'hébergement.",
    challenges: [
      {
        title: "Faire référencer par Google des pages générées par le backend",
        problem:
          "Chaque page était assemblée à partir de données envoyées par le backend à la demande. Un moteur de recherche qui visitait le site n'y trouvait presque rien à indexer : les pages n'apparaissaient donc pas sur Google.",
        solution:
          "Nous avons rendu les pages côté serveur avec Next.js, pour que le contenu soit déjà là quand le robot arrive. Il y avait trop de pages pour toutes les traiter ainsi : nous avons rendu côté serveur la page d'accueil, les produits les plus populaires et les catégories, et laissé le reste se charger dans le navigateur.",
      },
      {
        title: "Garder l'interface synchronisée avec un backend lent",
        problem:
          "Les résultats de recherche et les conseils de l'IA arrivaient en retard : l'interface attendait souvent le backend et les deux se désynchronisaient.",
        solution:
          "Nous avons agi des deux côtés : le frontend conservait certaines réponses pour les réutiliser au lieu de les redemander, et nous avons ajouté de la mise en cache avec l'équipe backend.",
      },
    ],
    lessons: [
      "Rendre toutes les pages produits pour les moteurs de recherche, pas seulement les plus populaires. Next.js peut générer une page à sa première visite puis en garder une copie, ce qui supprime la limite du « trop de pages ».",
      "Afficher les conseils de l'IA au fur et à mesure qu'ils sont écrits, mot par mot, pour que l'acheteur n'attende jamais devant un écran vide.",
      "Je conviendrais sans doute aussi du format des données avec l'équipe backend avant de commencer, pour que les deux côtés restent alignés dès le premier jour.",
    ],
  },
  "restore-forest-cameroon": {
    summary: "Une plateforme de reboisement pour gérer les ressources forestières et suivre les progrès à travers le Cameroun.",
    role: "Développeur frontend",
    context:
      "Les équipes de reboisement avaient besoin d'un seul endroit pour enregistrer les ressources forestières et voir l'avancée des plantations, région par région.",
    approach: [
      "Développement du frontend Angular, relié à un backend Spring Boot et PostgreSQL.",
      "Création de formulaires interactifs pour saisir et gérer les fiches de ressources forestières.",
      "Ajout de visualisations montrant l'avancée du reboisement et la répartition des essences dans 10 régions.",
      "Optimisation des échanges entre frontend et backend, avec des composants Angular réutilisables.",
    ],
    outcome:
      "Plus de 100 000 fiches de ressources forestières gérées. La saisie est devenue 30 % plus rapide, les temps de chargement des données ont baissé de 40 % et les composants réutilisables ont réduit le temps de développement de 25 %.",
  },
  memento: {
    summary: "Un mur de photos partagé où les membres publient, parcourent et modèrent les images.",
    role: "Développeur full-stack et designer",
    context:
      "Une communauté avait besoin d'un seul endroit pour rassembler et partager ses photos, avec une connexion pour que chacun reste maître de ses publications et un moyen de garder le mur public propre.",
    approach: [
      "Connexion par lien e-mail et par Google, avec Supabase Auth.",
      "Conception d'un mur public et d'une page personnelle pour les photos de chaque membre.",
      "Ajout d'un espace de modération pour les administrateurs, avec des accès contrôlés dans la base par des règles de sécurité au niveau des lignes.",
      "Deux ambiances qui suivent le thème de l'appareil : « Magazine » en clair, « Galerie » en sombre.",
    ],
  },
  tomo: {
    summary: "Une plateforme de VTC pensée pour le Cameroun, avec paiement par mobile money.",
    role: "Développeur full-stack et architecte",
    context:
      "Au Cameroun, trouver une course sûre à un prix juste passe souvent par une négociation dans la rue. Passagers et chauffeurs avaient besoin d'une application locale, adaptée à la façon dont les gens paient vraiment.",
    approach: [
      "Conception du backend en applications Django : utilisateurs, chauffeurs, véhicules, courses, notes, paiements et notifications.",
      "PostGIS pour trouver les chauffeurs à proximité ; Django Channels et Redis pour le suivi des courses en direct.",
      "Paiement en espèces, MTN Mobile Money et Orange Money, avec portefeuille et suivi des commissions.",
      "Fonctions de sécurité : vérification du chauffeur par QR code, bouton SOS et notation dans les deux sens.",
      "Applications web et mobile avec Angular et Ionic/Capacitor, en anglais et en français.",
    ],
  },
  sygenes: {
    summary: "Le système numérique de gestion des notes de l'ESIGN, pour l'enseignement supérieur.",
    role: "Responsable frontend",
    context:
      "L'école gérait les notes dans des tableurs éparpillés ; le personnel et les étudiants avaient besoin d'un système unique, clair et fiable.",
    approach: [
      "Pilotage du développement frontend d'un système de gestion des notes centré sur l'utilisateur.",
      "Interfaces adaptatives en HTML, CSS, JavaScript et Tailwind CSS.",
      "Architecture à base de composants, reliée au backend Symfony par des appels de service.",
      "Personnalisation du thème, notifications dynamiques et confirmation de suppression en deux étapes.",
      "Rédaction de la documentation et amélioration continue à partir des retours des utilisateurs.",
    ],
  },
  hemowatch: {
    summary: "Une application téléphone et montre Wear OS qui suit les personnes atteintes de drépanocytose.",
    role: "Développeur mobile",
    context:
      "Les premiers signes d'une crise drépanocytaire passent facilement inaperçus au quotidien ; une montre, elle, reste toujours au poignet.",
    approach: [
      "Application mobile qui collecte en temps réel les données de santé des appareils Wear OS.",
      "Lecture du rythme cardiaque, de la saturation en oxygène, de la fréquence respiratoire et de la température par les capteurs de la montre.",
      "Interface Flutter affichant les mesures de santé en direct.",
      "Alertes automatiques quand les mesures dépassent les seuils définis.",
    ],
  },
  "global-english-institute": {
    summary: "Le site d'une école de langues, avec test de niveau en ligne et inscriptions.",
    role: "Développeur full-stack",
    context:
      "L'institut gérait les tests de niveau et les inscriptions à la main : les futurs étudiants attendaient et le personnel ressaisissait les mêmes informations.",
    approach: [
      "Site public avec les pages des programmes, les contacts et les mentions légales.",
      "Test de niveau en ligne, dont les résultats sont enregistrés dans Supabase.",
      "E-mails de confirmation d'inscription et de test envoyés par des Edge Functions Supabase via Resend.",
      "Tableau de bord d'administration pour les tests, les inscriptions, les témoignages et les réglages du site.",
    ],
  },
  laboussole: {
    summary: "Une plateforme d'e-learning adaptative, avec cours multimédias et suivi de progression.",
    role: "Développeur logiciel",
    context: "Les apprenants avaient besoin de cours accessibles sur n'importe quel appareil, avec une progression enregistrée.",
    approach: [
      "Conception et développement des fonctions principales : cours multimédias, authentification et suivi de progression.",
      "Travail en équipe pluridisciplinaire sur la planification, les tests et les améliorations successives.",
      "Optimisation de l'interface pour tous les supports, l'engagement et l'accessibilité.",
    ],
  },
  comparer: {
    summary: "Une plateforme de comparaison de produits et de services, avec recherche et filtres.",
    role: "Développeur frontend",
    context:
      "Les gens avaient besoin d'un seul endroit pour comparer produits et services côte à côte, au lieu de jongler entre onglets et tableurs.",
    approach: [
      "Frontend adaptatif, pensé d'abord pour le mobile, avec Angular 19 et Tailwind CSS.",
      "Composants interactifs pour chercher, filtrer et comparer.",
      "Intégration avec un backend Django pour afficher les données produits en direct.",
    ],
  },
  autofish: {
    summary: "Le backend et l'API de la plateforme AutoFish, déployés sur un VPS.",
    role: "Développeur backend",
    context: "La plateforme AutoFish avait besoin d'un backend et d'une API fiables sur lesquels bâtir ses applications.",
    approach: [
      "Backend en Django, avec la logique métier et les points d'accès de l'API.",
      "Conception et gestion du schéma PostgreSQL, pour l'intégrité des données et des requêtes rapides.",
      "Authentification des utilisateurs et gestion des données sécurisées.",
      "Déploiement sur un VPS Hostinger avec les réglages de production, et maintenance de la chaîne de déploiement.",
    ],
  },
  "esign-registration": {
    summary: "La plateforme d'inscription en ligne au concours d'entrée de l'ESIGN.",
    role: "Développeur frontend et designer",
    context: "L'inscription au concours se faisait sur papier, avec des files d'attente et de la saisie manuelle.",
    approach: [
      "Maquettes dans Figma et frontend adaptatif pour mobile, tablette et ordinateur.",
      "Génération automatique d'un reçu pour chaque inscription terminée.",
      "Travail avec l'équipe backend sur les flux de données et optimisation de l'intégration de l'API.",
    ],
    outcome:
      "Plus de 400 candidats accompagnés, 99,9 % de disponibilité pendant le pic d'inscriptions et un temps d'inscription réduit de 15 %.",
  },
  "medical-school-file-manager": {
    summary: "Un gestionnaire de fichiers pour une faculté de médecine, avec dossiers imbriqués et accès par rôle.",
    role: "Développeur full-stack",
    context:
      "Les supports de cours étaient éparpillés entre des discussions et des drives personnels, sans moyen de les classer par année ni de contrôler qui pouvait modifier quoi.",
    approach: [
      "Fichiers rangés dans des dossiers imbriqués sans limite, regroupés par niveau d'études (années 1 à 7).",
      "Rôles pour les administrateurs, les modérateurs de niveau, les propriétaires de dossiers et les utilisateurs.",
      "Stockage interchangeable entre le serveur local et Google Drive, par simple configuration.",
      "Archivage et restauration, personnalisation aux couleurs de l'école et tableau de bord de statistiques.",
    ],
  },
  eduflex: {
    summary: "Une plateforme de gestion des notes pour les écoles.",
    role: "Développeur full-stack",
    context: "Les enseignants calculaient et reportaient les notes à la main.",
    approach: ["Saisie des notes, calcul automatique et génération des bulletins."],
  },
  "fauna-pulse": {
    summary: "Une application Flutter qui aide les agriculteurs à suivre la santé des sols et l'état des cultures.",
    role: "Développeur mobile",
    context: "Les agriculteurs avaient besoin de connaître l'état des sols et des cultures sans parcourir chaque parcelle.",
    approach: [
      "Application Flutter affichant les relevés des capteurs sur l'activité du sol et l'environnement de culture.",
      "Stockage et lecture des données des capteurs via un backend Supabase.",
      "Connexion à l'API LLaMA pour des analyses par IA et une aide intégrée.",
      "Tableaux de bord montrant la santé du sol en temps réel, d'un coup d'œil.",
    ],
  },
  "smart-haven": {
    summary: "Une application Flutter qui surveille en temps réel la santé des volailles et les conditions du poulailler.",
    role: "Développeur mobile",
    context:
      "Les éleveurs perdent des volailles quand la température, l'humidité ou des problèmes de santé passent inaperçus.",
    approach: [
      "Application Flutter de suivi en temps réel de la santé des volailles et des conditions ambiantes.",
      "Supabase pour le stockage, les mises à jour en direct et l'historique des relevés.",
      "Assistant basé sur LLaMA pour l'analyse et les questions.",
      "Mesures de santé, facteurs ambiants et alertes automatiques réunis dans une seule interface.",
    ],
  },
  "smart-fire-detection": {
    summary: "Le logiciel embarqué d'un système de détection d'incendie en temps réel, sur réseau de capteurs sans fil.",
    role: "Développeur de logiciel embarqué",
    context: "Un incendie se propage vite quand personne n'est assez près pour remarquer la fumée ou la chaleur qui monte.",
    approach: [
      "Programmation des modules de capteurs de fumée, de température et de gaz, avec alertes sur seuil.",
      "Conception du protocole de communication entre les capteurs et l'unité centrale de contrôle.",
      "Intégration de modules Wi-Fi et Bluetooth pour la surveillance à distance et des alertes rapides.",
      "Tests et débogage pour une détection précise et une connexion stable.",
    ],
  },
  autogex: {
    summary: "Un outil Java pour les expressions régulières, réalisé par une équipe de 15 personnes en Scrum.",
    role: "Responsable Scrum et développeur",
    context: "Un projet logiciel d'école mené comme une vraie équipe produit, avec sprints et user stories.",
    approach: [
      "Encadrement d'une équipe de 15 personnes tout au long du projet, en Scrum.",
      "Rédaction des spécifications et des user stories ; planification et conduite de 3 sprints.",
      "Développement du module qui nettoie les expressions régulières en supprimant redondances et erreurs.",
    ],
  },
  pras: {
    summary: "Un hub de maison connectée qui pilote les appareils à partir de capteurs et d'un modèle d'apprentissage automatique.",
    role: "Développeur logiciel",
    context: "Les foyers gaspillent de l'énergie et ratent des problèmes de sécurité quand personne ne surveille leurs appareils.",
    approach: [
      "Logiciel central en Python pour gérer les équipements de la maison et les données des capteurs.",
      "Liaison du hub à un serveur web en HTTP et WebSockets, pour des données en temps réel.",
      "Intégration de quatre capteurs d'environnement pour la surveillance et le pilotage automatique.",
      "Déploiement d'un modèle d'apprentissage automatique sur le hub pour de meilleures décisions d'automatisation.",
    ],
  },
  "smart-point": {
    summary: "Un système embarqué à cinq périphériques, réalisé par une équipe de cinq.",
    role: "Développeur embarqué",
    context: "Un projet de première année d'ingénierie, couvrant à la fois le logiciel et la réalisation matérielle.",
    approach: [
      "Conception, développement et tests du logiciel des 5 périphériques du système.",
      "Participation à la fabrication du matériel et au câblage électrique.",
    ],
  },
  "digital-signature": {
    summary: "La refonte d'un outil de signature numérique pour ordinateur, réalisé avec Tkinter.",
    role: "Refonte de l'interface",
    context: "L'outil existant fonctionnait, mais il était difficile à utiliser.",
    approach: ["Refonte de l'interface et du parcours utilisateur, dans les limites de Tkinter."],
  },
};
