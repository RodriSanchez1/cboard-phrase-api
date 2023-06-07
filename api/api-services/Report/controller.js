module.exports = {
  topUsedSenteces,
};

async function topUsedSenteces(req, res) {
  try {
    // boyd de la request:
    // {
    //     "userId": "64779dbca096d823263c2cd7",
    //     "days": 30
    // }
    // Los eventos de donde obtener las frases se encuentran en la collection Events.
    // La consulta debe devolver la cantidad de veces que se a utilizado cada frase (event.label),
    // y cual es dicha fease, entre la fecha actual y la actual menos los dias especificados en el parametro days
    // la respuesta debe ser un array de maximo 5 objetos, ordenados de manera desc,
    // donde cada objeto tiene la siguiente estructura:
    // [{
    //   "sentence": "I am a sentence",
    //   "count": 10
    // },
    // {
    //   "sentence": "I am another sentence",
    //   "count": 5
    // } ]

    return res.status(200).json();
  } catch (err) {
    return res.status(409).json({
      message: 'Error getting analytics',
      error: err.message,
    });
  }
}
