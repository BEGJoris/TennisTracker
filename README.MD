# Ionic 7 CRUD Application

## Description
Ce projet est une application mobile réalisée avec le framework **Ionic 7** et **Angular 19**. Elle permet de gérer un CRUD (Create, Read, Update, Delete) sur une ressource choisie.
Mon projet est intitulé **"Tennis Tracker"**, c'est une application mobile dédiée aux joueurs de tennis qui souhaitent suivre leurs performances,
enregistrer leurs matchs, et analyser leurs statistiques.
Que vous soyez un amateur ou un compétiteur aguerri,
cette application vous aide à progresser dans votre pratique en proposant un suivi détaillé de vos résultats et un historique complet de vos rencontres.

## Stack technique
- **Ionic 7** : Framework hybride pour le développement mobile
- **Angular 19** : Framework JavaScript moderne (avec des fonctionnalités d'Angular 17 comme les directives `@if`, `@for`, etc.)
- **Firebase** : Backend as a Service (BAAS) utilisé pour la gestion des données en temps réel
- **Capacitor 6** : Bridge permettant d'utiliser les fonctionnalités natives du téléphone
- **RxJS** : Librairie JavaScript pour gérer les flux de données asynchrones via les observables.

## Fonctionnalités principales

- **Connexion à Firebase** :
  - Gestion des opérations CRUD via Firebase.
  - Synchronisation en temps réel grâce à Firebase.

- **Utilisation des composants Ionic** :
  - Système de grille
  - Composants d'icônes et d'images
  - Menu tabs pour une navigation fluide

- **Système de navigation** :
  - Gestion des piles de navigation propre à Ionic
  - Passage de paramètres entre les pages

- **Fonctionnalité native** :
  - Intégration de Capacitor pour utiliser une fonctionnalité native du téléphone. Dans mon cas, la fonctionnalité de **géolocalisation**.

- **Validation des formulaires** :
  - Cohérence entre les types de données et les types de champs
  - Validation côté client avant l'envoi des données

## Fonctionnalités techniques avancées

- Mise en place et gestion des **Observables**, **Subjects** et **BehaviorSubjects** pour gérer la réactivité des données.
- Résolution des données avec un **Resolver** avant de naviguer vers certaines pages, assurant que les données nécessaires sont prêtes avant l'affichage.
- Utilisation d'**Angular Services** pour centraliser la logique métier et faciliter la réutilisation du code.
- Implémentation des formulaires réactifs avec **ReactiveFormsModule** pour une validation puissante et une expérience utilisateur améliorée. (**Validators**, **FormBuilder**...)
- Gestion des flux asynchrones en utilisant des concepts avancés d'Angular et RxJS.
- Utilisation d'animations Angular pour une interface fluide et dynamique.


### N.B.
Il est crucial d'utiliser Angular en version **>= 17**, car le projet exploite des fonctionnalités introduites à partir de cette version, comme les directives structurelles avancées `@if` et `@for`.


## Structure du projet
### Pages
- **Page d'accueil :** Permet de naviguer vers les principales sections de l'application.
- **Page "À propos" :** Fournit des informations sur l'application, ses fonctionnalités et son créateur.
- **Page Liste des matchs :** Affiche tous les matchs enregistrés sous forme de liste.
- **Page Création de match :** Permet d'ajouter un nouveau match avec des sous formulaires pour le résultat, les statistiques...
- **Page Modification de match :** Permet de modifier les détails d'un match existant.
- **Page avec fonctionnalité native :** Utilise la géolocalisation



## Installation et exécution
1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/BEGJoris/TennisTracker.git
   ```
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Configurer Firebase** :
  - Ajouter les informations de configuration Firebase dans le fichier `environment.ts`.
  - Activer les services nécessaires (Firestore, Authentication, etc.).
4. **Lancer l'application** :
   ```bash
   ionic serve
   ```
## Export de l'application sous Android :

1. **Configurer l'environnement** :
   ```bash
   ionic cap add android
   ```
2. **Synchroniser les changements** :
   ```bash
   ionic cap sync android
   ```
3. **Exporter l'application** :
   ```bash
   ionic cap build android
   ```

#### Rendez-vous sur Android Studio pour lancer l'application ou build un APK.
## Aperçu

- **Composants Ionic** : L'application exploite au maximum les composants d'Ionic pour une interface utilisateur moderne et responsive.
- **Thème** : L'application est optimisée pour une utilisation mobile avec un design cohérent et attractif.
- **CRUD** : Fonctionnalités CRUD entièrement opérationnelles avec Firebase.
- **Expérience réactive** : Grâce aux observables et aux formulaires réactifs, l'application offre une expérience fluide et performante.

## Barème de réalisation
| Objectifs                                    | Statut         |
|---------------------------------------------|----------------|
| Création d'un projet Ionic                  | ✅ Accompli    |
| Création des pages nécessaires              | ✅ Accompli    |
| Utilisation des piles de navigation         | ✅ Accompli    |
| Composants Ionic                            | ✅ Accompli    |
| Fonctionnalité native                       | ✅ Accompli    |
| Validation des formulaires                  | ✅ Accompli    |
| Connexion Firebase                          | ✅ Accompli    |
| CRUD complet avec Firebase                  | ✅ Accompli    |
| Utilisation avancée des Observables et RxJS | ✅ Accompli    |
| Lisibilité du code                          | ✅ Accompli    |

## Possibilités d'améliorations

- Ajout de tests unitaires.
- Déployer l'application sous Docker.
