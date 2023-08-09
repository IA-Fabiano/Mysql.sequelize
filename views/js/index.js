function fazerLogin() {
    const url = 'http://localhost:8080/login'; 
  
    const loginData = {
      user_usuario: document.getElementById('loginID').value,
      user_senha: document.getElementById('senhaID').value
    };
     

    
    $.ajax({
      url: url,
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      data: loginData
    })
      .done(function( data ) {
          console.log(data);
      
          if(data.code == '200'){
              alert('certo')
              location.href = "/html/userPage.html"
          }else{
              alert(data.mensage)
          }
      });
}

function fazerCadastro(){
    const url = 'http://localhost:8080/cadastro'; 
  
    const cadData = {
      user_usuario: document.getElementById('userNameCadastroID').value,
      user_nome: document.getElementById('nomeCadastroID').value,
      user_senha: document.getElementById('cadastroPassawordID').value
    };
       
  

    
    $.ajax({
      url: url,
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      data: cadData
    })
      .done(function( data ) {
          console.log(data);
      
          if(data.code == 200 ){
            //location.href = "/html/userPage.html"
            alert('certo')
          }else{
            alert(data.mensage)
          }
      });
}
 /*
function fazerCadastro() {
  const url = 'http://localhost:8080/cadastro';
  
  const cadData = {
    user_usuario: document.getElementById('userNameCadastroID').value,
    user_nome: document.getElementById('nomeCadastroID').value,
    user_senha: document.getElementById('cadastroPassawordID').value
  };
  
  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(cadData) 
  };
  
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      
      if (data.code =='200') {
        location.href = "/html/userPage.html";
        alert(data.mensage);
        console.log(data.mensage);
      } else {
        alert(data.mensage);
      }
    })
    .catch(error => {
      console.error('Erro na requisição de cadastro:', error);
    });
} 
  */
function listar() {
  const url = 'http://localhost:8080/listar';
  fetch(url)
 
    .then(data => {
      exibirLista(data);
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
}

function exibirLista(data) {
  const listContainer = document.getElementById('list');
  listContainer.innerHTML = ''; 

  if (Array.isArray(data)) {
    if (data.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Nenhum cadastro encontrado.';
      listContainer.appendChild(emptyMessage);
      return;
    }

    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.innerHTML = `
        <p>Nome: ${item.Nome}</p>
        <p>Id: ${item.id}</p>
        <p>Id: ${item.Username}</p>
        <button onclick="editarCadastro(${item.id})">Editar</button>
        <button onclick="excluirCadastro(${item.id})">Excluir</button>
        <hr>
      `;
      listContainer.appendChild(listItem);
    });
  } else {
    console.error('Os dados retornados não estão no formato de array.');
  }
}


function editarCadastro(id) {
  
  const novoCadastro = {
    user_nome: "Novo Nome",
    user_usuario: "Novo Username",
    id: id,
    user_senha: "Nova senha",
  };

  const url = `http://localhost:8080/editar`; 
  fetch(url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoCadastro)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao editar o cadastro');
      }
      return response.json();
    })
    .then(data => {
      console.log('Cadastro editado com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro na requisição de edição:', error);
    });
}


function excluirCadastro(id) {
  const url = `http://localhost:8080/deletar`; 
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: id 
  })
    .then(data => {
      console.log('Cadastro excluído com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro na requisição de exclusão:', error);
    });
}















  
