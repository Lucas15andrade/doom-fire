const arrayFogo = []
let larguraFogo = 50
let alturaFogo = 50
let debug = false
const paletaCores = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]


function inicializar() {
    criarEstruturaDeDados()
    criarFonteFogo()

    setInterval(calcularPropagacaoFogo, 50)
}

function criarEstruturaDeDados() {
    const numeroPixels = larguraFogo * alturaFogo

    for (let i = 0; i < numeroPixels; i++) {
        arrayFogo[i] = 0
    }
}

function calcularPropagacaoFogo() {
    for (let coluna = 0; coluna < larguraFogo; coluna++) {
        for (let linha = 0; linha < alturaFogo; linha++) {
            const pixelIndex = coluna + (larguraFogo * linha)

            atualizarValorPixel(pixelIndex)
        }
    }

    renderizarFogo()
}

function atualizarValorPixel(pixelAtual) {
    //Calculando o pixel da linha de baixo
    const pixelAbaixo = pixelAtual + larguraFogo

    //Verificando se o pixel da linha de baixo é a última linha da 'matriz'
    //Para não alterar onde a intensidade do fogo deve estar alta

    if (pixelAbaixo >= larguraFogo * alturaFogo) {
        return
    }

    //Quanto cada pixel de baixo deve ser descontado
    //const desconto = 1
    const desconto = Math.floor(Math.random() * 3)
    //Quando valor da intensidade do pixel abaixo da 'matriz' do array
    const intensidadePixelAbaixo = arrayFogo[pixelAbaixo]
    //Calculando nova intensidade do pixel
    const novaIntensidadeFogo =
        intensidadePixelAbaixo - desconto >= 0 ? intensidadePixelAbaixo - desconto : 0

    arrayFogo[pixelAtual - desconto] = novaIntensidadeFogo
}

function renderizarFogo() {
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let linha = 0; linha < alturaFogo; linha++) {
        html += '<tr>'

        for (let coluna = 0; coluna < larguraFogo; coluna++) {
            const pixelIndex = coluna + (larguraFogo * linha)
            const intensidadeFogo = arrayFogo[pixelIndex]
            const color = paletaCores[intensidadeFogo]
            const colorString = `${color.r},${color.g},${color.b}`

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-indice">${indicePixel}</div>`
                html += `<div> style="color: rgb(${colorString})"${intensidadeFogo}</div>`
                html += '</td>'
            } else {
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fogo').innerHTML = html
}

function criarFonteFogo() {
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        const ultimaPosicao = larguraFogo * alturaFogo;
        const indicePixel = (ultimaPosicao - larguraFogo) + coluna
        //const intensidadeAtual = arrayFogo[indicePixel]

        arrayFogo[indicePixel] = 36
    }
}


inicializar()
