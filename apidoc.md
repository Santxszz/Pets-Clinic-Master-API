
## Documentação da API


#### Listando os tutores cadastrados.

<details>
 <summary><code>GET</code> <code><b>/tutors</b></code> <code>(Este endpoint lista todos os tutores cadastrados no sistema.)</code></summary>

##### Parameters
> None
> 
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `400`         | `application/json`                | `Dados não encontrados`                            |

##### Example Response BODY
 ```json
	[
	  {
	    "id": 1,
	    "name": "Jonh Doe",
	    "phone": "85989323895",
	    "email": "jose.abreu@compasso.com",
	    "date_of_birth": "1993-12-12 10:10",
	    "zip_code": "61760000",
	    "pets": [
	      {
	        "id": 1,
	        "name": "Lilo",
	        "species": "dog",
	        "carry": "p",
	        "weight": 5,
	        "date_of_birth": "1993-12-12 10:10"
	      }
	    ]
	  }
]
```
</details>

------------------------------------------------------------------------------------------
#### Inserção - Atualização e Exclusão de dados de Tutores.

<details>
 <summary><code>POST</code> <code><b>/tutor</b></code> <code>(Inserção de um tutor ao sistema.)</code></summary>

##### Parameters

> None

##### Request Body (Todos Obrigatórios)*
```json
{
 name: "Jonas",
 phone: "85989323895",
 email: "jonas@paidepet.com",
 date_of_birth: "1993-12-12 10:10",
 zip_code: "61760000"
}
```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | Criado com sucesso.                                                       |
> | `400`         | `application/json`        | Informações não preenchidas.                                                   |
>  | `400`         | `application/json`        | Email ou Nome Inválido.                                           |


------------------------------------------------------------------------------------------
 <summary><code>PUT</code> <code><b>/tutor/{id}</b></code> <code>(Atualiza os dados de um tutor.)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id` |  required | int ($int64)   | ID do tutor  que deseja alterar os dados.        |

##### Request Body (Todos Obrigatórios)*
```json
{
 name: "Jonas",
 phone: "85989323895",
 email: "jonas@paidepet.com",
 date_of_birth: "1993-12-12 10:10",
 zip_code: "61760000"
}
```


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | Criado com sucesso.                                                       |
> | `400`         | `application/json`        | Informações não preenchidas.                                                   |
>  | `400`         | `application/json`        | Email ou Nome Inválido.                                           |
>   | `400`         | `application/json`        | Id do tutor inválido ou não encontrado no sistema                       |
------------------------------------------------------------------------------------------

  <summary><code>DELETE</code> <code><b>/tutor/{id}</b></code> <code>(Deleta um tutor através do id informado no path.)</code></summary>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `id` |  required  |int ($int64)| O id de identificação do tutor.                |

##### Responses
> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `204`         | `application/json`        | Deletado com sucesso.                                                       |
>   | `400`         | `application/json`        | Id do tutor inválido ou não encontrado no sistema                       |

-------------------------------------------------------------------------------------------

<details>
 <summary><code>POST</code> <code><b>/pet/{tutorId}</b></code> <code>(Inserção de um pet vinculado a um tutor ao sistema.)</code></summary>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `tutorId` |  required  |int ($int64)| O id de identificação do tutor.                |

##### Request Body (Todos Obrigatórios)*
```json
{
 name: "Lilo",
 species: "dog",
 carry: "p",
 weight: 5,
 date_of_birth: "1993-12-12 10:10",
}
```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | Criado com sucesso.                                                       |
> | `400`         | `application/json`        | Informações não preenchidas.                                                   |


------------------------------------------------------------------------------------------
 <summary><code>PUT</code> <code><b>/pet/{petId}/tutor/{tutorId}</b></code> <code>(Atualiza as informações de um pet que é vinculado a um tutor.)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `petId` |  required | int ($int64)   | ID do pet que será alterado.       |
> | `tutorId` |  required | int ($int64)   | ID do tutor do pet.    |

##### Request Body (Todos Obrigatórios)*
```json
{
 name: "Jonas",
 phone: "85989323895",
 email: "jonas@paidepet.com",
 date_of_birth: "1993-12-12 10:10",
 zip_code: "61760000"
}
```
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | Criado com sucesso.                                                       |
> | `400`         | `application/json`        | Informações não preenchidas ou Id do tutor ou pet inválido.    

-------                                               -------------------------------------------
 <summary><code>DELETE</code> <code><b>/pet/{petId}/tutor/{tutorId}</b></code> <code>(Deleta as informações de um pet que é vinculado a um tutor.)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `petId` |  required | int ($int64)   | ID do pet que será alterado.       |
> | `tutorId` |  required | int ($int64)   | ID do tutor do pet.    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `204`         | `application/json`        | Deletado com sucesso.                                                       |
> | `400`         | `application/json`        | Id do tutor ou pet inválido ou não encontrado.    


Referência para este modelo de Markdown
- [Referência Markdown](https://gist.github.com/azagniotov/a4b16faf0febd12efbc6c3d7370383a6#file-beautiful-rest-api-docs-in-markdown-md)