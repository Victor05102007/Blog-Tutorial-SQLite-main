let prompt = require("prompt-sync");
prompt = prompt();

let Celsius = parseFloat(prompt("Qual a temperatura em Celcius? "));

// Para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'
function calcularTemperatura(Celsius) {
  const resultado = Celsius * 1.8 + 32;
  console.log("O valor em fahrenheit é: ", resultado);
}

calcularTemperatura(Celsius);
