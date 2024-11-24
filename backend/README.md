# Ugram  📸

## Design ✏️

### Information Utile :

Nous avons rencontré des difficultés lors du déploiement sur AWS, ce qui nous a contraints à apporter quelques modifications. Par conséquent, nous avons choisi de déployer sur la plateforme render.com en utilisant leur plan gratuit. Cependant, ce plan présente un inconvénient : si l'instance n'est pas utilisée, elle passe en mode "veille". Lors du premier appel, cela peut entraîner un délai supplémentaire de 50 secondes pendant lequel l'API se lance.

### Lien API : 

https://cicd-pipeline-3112-backend-equipe07.onrender.com/api#/

### Le frontend :

Pour la partie frontend, nous avons choisis le langage Typescript avec le Framework React et la librairie de composant Tailwind.

### Le backend :

Pour la partie backend, nous également choisis le langage Typescript avec cette fois-ci le Framwork Nestjs avec comme ORM Prisma et Potsgresql pour la base de données.

### La CI / CD :

Pour la CI/CD, nous avons opté pour l'utilisation de GitHub Actions pour nos déploiements et tests. Nous prévoyons de déployer l'application sur des serveurs AWS grâce à leur offre gratuite.


## Démarrer l'application 🚀

Pour démarrer l'application il vous suffit simplement d'installer docker et de lancer la commande suivante. Une fois l'opération effectué, nous vous invitons à lancer le frontend présent sur ce [repository](https://github.com/GLO3112-classrooms/ugram-h2024-team-07-frontend).

```bash
# Démarrer le backend
yarn docker:up

# Si besoin vous pouvez également taper la commande suivante (racine du projet)
docker compose -f docker/docker-compose.prod.yml up -d

# Étendre le backend
yarn docker:down

#  Si besoin vous pouvez également taper la commande suivante (racine du projet)
docker-compose -f ./docker/docker-compose.prod.yml down
```


⚠️ *Le fichier [localstack-setup.sh](./docker/localstack-setup.sh) doit être executable par le conteneur (chmod 755). Dans le cas où le projet serait récupéré par un autre moyen que git veuillez préter attention à ce fichier (risque d'echec de l'upload des fichiers)*
