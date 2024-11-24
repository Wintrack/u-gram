# Ugram  📸

## Design ✏️

### Le frontend :

Pour la partie frontend, nous avons choisis le langage Typescript avec le Framework React et la librairie de composant Tailwind.

### Le backend :

Pour la partie backend, nous également choisis le langage Typescript avec cette fois-ci le Framwork Nestjs avec comme ORM Prisma et Potsgresql pour la base de données.

### La CI / CD :

Pour la CI/CD, nous avons opté pour l'utilisation de GitHub Actions pour nos déploiements et tests. Nous prévoyons de déployer l'application sur des serveurs AWS grâce à leur offre gratuite.

## Livrable 3

L'application est disponible à l'adresse suivante : http://ugram-h24-team-07-frontend.s3-website.us-east-2.amazonaws.com/

### Options choisies

(5) L'usager doit pouvoir rechercher par mot clé ou description avec autocomplétion  
(5) L'usager doit pouvoir consulter les mots-clés les plus populaires  
(5) L'usager doit pouvoir prendre une photo avec sa webcam

### Autoriser la webcam

Chrome et d'autres navigateurs refusent l'accès à la webcam lorsque l'origine n'est pas sécurisée, ce qui est le cas pour les compartiments S3.

Pour permettre de tester néammoins la fonctionnalité, vous pouvez suivre les étapes suivantes (dans chrome) : 

* Allez à la page : chrome://flags/#unsafely-treat-insecure-origin-as-secure
* Ajoutez l'url de l'application : http://ugram-h24-team-07-frontend.s3-website.us-east-2.amazonaws.com/
* Selectionnez "enabled" et relancez l'application

### Resizing d'images

La gestion du resizing des images se fait depuis la page de l'image > Edit picture.  
Différents formats d'images par défaut sont proposés, et l'utilisateur peut également choisir un format personnalisé.

## Livrable 2

L'application est disponible à l'adresse suivante : http://ugram-h24-team-07-frontend.s3-website.us-east-2.amazonaws.com/

## Livrable 1

Pour démarrer l'application il vous suffit simplement d'installer docker et de lancer la commande suivante.

⚠️ *Il est recommander de démarrer la partie backend présent sur ce [repository](https://github.com/GLO3112-classrooms/ugram-h2024-team-07-backend) au préalable.*

```bash
# Démarrer le frontend
yarn docker:up

# Si besoin vous pouvez également taper la commande suivante (racine du projet)
docker compose -f docker/docker-compose.prod.yml up -d

# Étendre le frontend
yarn docker:down

#  Si besoin vous pouvez également taper la commande suivante (racine du projet)
docker-compose -f ./docker/docker-compose.prod.yml down
```

Félicitation vous pouvez maintenant accéder à l'application sur l'url suivant : http://localhost:3001/
