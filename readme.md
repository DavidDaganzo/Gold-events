Auth routes

| HTTP Method 	| URI path              	  | Description            |  JSON |
|:-------------:|-----------------------|:----------------------:|:---------:|
| GET         	| `/`             	    | Index page             |           |
| GET         	| `/sign-in`       	    | User Registration      |           |
| POST        	| `/sign-in`       	    | User Registration	     |           |
| GET         	| `/login`              | Login user 	           |           |
| POST        	| `/login`              | Login user	           |           |
| POST        	| `/logout`  	          | Logout user	           |           |

USER routes

| HTTP Method 	| URI path                	| Description            |  JSON     |
|:-------------:|---------------------------|:----------------------:|:----------:|
| GET         	| `/profile` 	          | See user profile 	     |           |
| GET         	| `/profile/edit`        | Edit user profile      |           |
| POST         	| `/profile/edit`        | Edit user profile      |           |

EDITOR routes

| HTTP Method 	| URI path              	| Description            |  JSON     |
|:-------------:|---------------------------|:----------------------:|:----------:|
| GET         	| `/index-edit`             | Edit edit homepage     |           |
| POST         	| `/index-edit`             | Edit edit homepage     |           |


ADMIN routes
| HTTP Method 	| URI path              	| Description            |  JSON     |
|:-------------:|---------------------------|:----------------------:|:----------:|
| GET         	| `/user-list`              | View user list         |           |
| GET         	| `/details/:user_id`       | View user list         |           |
| GET         	| `/details/:user_id/edit`  | Edit user              |           |
| POST         	| `/details/:user_id/edit`  | Edit user              |           |

Events routes
| HTTP Method 	| URI path              	| Description            |  JSON     |
|:-------------:|---------------------------|:----------------------:|:----------:|
| GET         	| `/events/music`           | View music events      |           |
| GET         	| `/events/sports`          | View sports events     |           |
| GET         	| `/events/art-theater`     |View theater events     |           |











