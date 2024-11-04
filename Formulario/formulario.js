const form = document.querySelector('#formulario');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');
  const inputIdade = e.target.querySelector('#idade');
  const inputSexo = e.target.querySelector('#sexo');
  const inputAtividade = e.target.querySelector('#atividade');

  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);
  const idade = Number(inputIdade.value);
  const sexo = inputSexo.value;
  const atividade = inputAtividade.value;

  if (!peso || !altura || !idade) {
    setResultado('Por favor, preencha todos os campos corretamente.', false);
    return;
  }

  const tmb = calcularTMB(peso, altura, idade, sexo);
  const gastoCalorico = calcularGastoCalorico(tmb, atividade);

  const msg = `Seu gasto calórico diário estimado é ${gastoCalorico.toFixed(2)} calorias.`;
  setResultado(msg, true);
});

function calcularTMB(peso, altura, idade, sexo) {
  if (sexo === 'masculino') {
    return 66.5 + (13.75 * peso) + (5 * altura) - (6.75 * idade);
  } else {
    return 655.1 + (9.56 * peso) + (1.85 * altura) - (4.68 * idade);
  }
}

function calcularGastoCalorico(tmb, atividade) {
  const fatoresAtividade = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    'muito-intenso': 1.9
  };

  return tmb * fatoresAtividade[atividade];
}

function criaP() {
  const p = document.createElement('p');
  return p;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';

  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}
