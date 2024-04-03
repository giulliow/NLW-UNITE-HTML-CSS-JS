let participantes= [
  {
    nome: 'Giullio Gerolamo',
    email: 'giullio_cruz@hotmail.com',
    dataInscricao: new Date(2024,2,22,19,20),
    dataCheckin: new Date(2024,2,25,22,00),
    aniversario: new Date(2001,7,21,05,34)
  },
  {
    nome: 'Jorge Pires',
    email: 'jorgeprj@hotmail.com',
    dataInscricao: new Date(2024,2,21,08,40),
    dataCheckin: new Date(2024,2,26,21,05),
    aniversario: new Date(2002,1,4,12,30)
  },
  {
    nome: 'Marina Silva',
    email: 'marinasilva@example.com',
    dataInscricao: new Date(2024,2,23,15,10),
    dataCheckin: null,
    aniversario: new Date(1999,11,15,18,20)
  },
  {
    nome: 'Lucas Mendes',
    email: 'lucasmendes@example.com',
    dataInscricao: new Date(2024,2,24,10,30),
    dataCheckin: new Date(2024,2,28,08,15),
    aniversario: new Date(1998,5,9,09,45)
  },
  {
    nome: 'Ana Santos',
    email: 'anasantos@example.com',
    dataInscricao: new Date(2024,2,25,14,55),
    dataCheckin: new Date(2024,2,29,16,30),
    aniversario: new Date(2000,2,28,21,10)
  },
  {
    nome: 'Pedro Almeida',
    email: 'pedroalmeida@example.com',
    dataInscricao: new Date(2024,2,26,18,20),
    dataCheckin: new Date(2024,2,30,11,55),
    aniversario: new Date(1997,8,10,14,40)
  },
  {
    nome: 'Sara Oliveira',
    email: 'saraoliveira@example.com',
    dataInscricao: new Date(2024,2,27,21,45),
    dataCheckin: new Date(2024,3,1,14,20),
    aniversario: new Date(1996,3,5,07,25)
  },
  {
    nome: 'Rafaela Costa',
    email: 'rafaelacosta@example.com',
    dataInscricao: new Date(2024,2,28,11,10),
    dataCheckin: new Date(2024,3,2,16,45),
    aniversario: new Date(1995,10,20,10,50)
  },
  {
    nome: 'Leonardo Sousa',
    email: 'leonardosousa@example.com',
    dataInscricao: new Date(2024,2,29,14,30),
    dataCheckin: new Date(2024,3,3,09,15),
    aniversario: new Date(1994,4,12,15,35)
  },
  {
    nome: 'Carolina Fernandes',
    email: 'carolinafernandes@example.com',
    dataInscricao: new Date(2024,3,1,09,55),
    dataCheckin: new Date(2024,3,4,18,30),
    aniversario: new Date(1993,1,30,20,20)
  }
];

const criarparticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin)
  const dataAniversario = dayjs(participante.aniversario).format('DD/MM/YYYY')

  if(participante.dataCheckin == null){
    dataCheckin = `
    <button
      data-email = "${participante.email}"
      onclick = "fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong> ${participante.nome} </strong>
      <br>
      <small> ${participante.email} </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
    <td>${dataAniversario}</td>
  </tr>
  `

}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarparticipante(participante)
  }
  
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante={
    nome: formData.get('nome'),
    email: formData.get('email'),
    aniversario: formData.get('aniversario'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  const patricipanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(patricipanteExiste){
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name = "nome"]').value = ""
  event.target.querySelector('[name = "nome"]').value = ""

}

const fazerCheckIn = (event) => {
  const mensagemConfirm = 'Tem certeza que deseja fazer o check in?'
  if(confirm(mensagemConfirm) == false) {
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  participante.dataCheckin = new Date()

  atualizarLista(participantes)
}
