var linhas = 15
var colunas = 20
var qtdMinas = 0

var contador = 0

$('#jogo').append($(`<div id="contador"></div>`))

function colocarMinas(minas) {
    this.qtdMinas = minas
}

function checaAcima(linha, coluna) {
    var repeticao = 1
    while($(`#l-${linha - repeticao}-c-${coluna}`).text() == '0') {
        if($(`#l-${linha - repeticao}-c-${coluna}`).text() == '0') {
            $(`#l-${linha - repeticao}-c-${coluna}`).attr('class', 'bloco-clicked')
            repeticao += 1
        }
    }
    if('12345678'.includes($(`#l-${linha - 1}-c-${coluna}`).text()) && $(`#l-${linha}-c-${coluna}`).text() == '0') {
        $(`#l-${linha - 1}-c-${coluna}`).attr('class', 'bloco-clicked')
    }
}

function checaEsquerda(linha, coluna) {
    var repeticao = 1
    while($(`#l-${linha}-c-${coluna - repeticao}`).text() == '0') {
        if($(`#l-${linha}-c-${coluna - repeticao}`).text() == '0') {
            $(`#l-${linha}-c-${coluna - repeticao}`).attr('class', 'bloco-clicked')
            repeticao += 1
        }
    }
    if('12345678'.includes($(`#l-${linha}-c-${coluna - 1}`).text()) && $(`#l-${linha}-c-${coluna}`).text() == '0') {
        $(`#l-${linha}-c-${coluna - 1}`).attr('class', 'bloco-clicked')
    }
}

function checaDireita(linha, coluna) {
    var repeticao = 1
    while($(`#l-${linha}-c-${coluna + repeticao}`).text() == '0') {
        if($(`#l-${linha}-c-${coluna + repeticao}`).text() == '0') {
            $(`#l-${linha}-c-${coluna + repeticao}`).attr('class', 'bloco-clicked')
            repeticao += 1
        }
    }
    if('12345678'.includes($(`#l-${linha}-c-${coluna + 1}`).text()) && $(`#l-${linha}-c-${coluna}`).text() == '0') {
        $(`#l-${linha}-c-${coluna + 1}`).attr('class', 'bloco-clicked')
    }
}

function checaAbaixo(linha, coluna) {
    var repeticao = 1
    while($(`#l-${linha + repeticao}-c-${coluna}`).text() == '0') {
        if($(`#l-${linha + repeticao}-c-${coluna}`).text() == '0') {
            $(`#l-${linha + repeticao}-c-${coluna}`).attr('class', 'bloco-clicked')
            repeticao += 1
        }
    }
    if('12345678'.includes($(`#l-${linha + 1}-c-${coluna}`).text()) && $(`#l-${linha}-c-${coluna}`).text() == '0') {
        $(`#l-${linha + 1}-c-${coluna}`).attr('class', 'bloco-clicked')
    }
}

function checaDiagonal(linha, coluna) {
    const diagCimaEsq = $(`#l-${linha - 1}-c-${coluna - 1}`)
    const diagCimaDir = $(`#l-${linha - 1}-c-${coluna + 1}`)
    const diagBaixoEsq = $(`#l-${linha + 1}-c-${coluna - 1}`)
    const diagBaixoDir = $(`#l-${linha + 1}-c-${coluna + 1}`)

    if(diagCimaEsq.text() == '0' || diagCimaEsq.text() == '1' || diagCimaEsq.text() == '2' || diagCimaEsq.text() == '3' || diagCimaEsq.text() == '4' || diagCimaEsq.text() == '5' || diagCimaEsq.text() == '6' || diagCimaEsq.text() == '7' || diagCimaEsq.text() == '8') {
        diagCimaEsq.attr('class', 'bloco-clicked')
    }
    
    if(diagCimaDir.text() == '0' || diagCimaDir.text() == '1' || diagCimaDir.text() == '2' || diagCimaDir.text() == '3' || diagCimaDir.text() == '4' || diagCimaDir.text() == '5' || diagCimaDir.text() == '6' || diagCimaDir.text() == '7' || diagCimaDir.text() == '8') {
        diagCimaDir.attr('class', 'bloco-clicked')
    }
    
    if(diagBaixoEsq.text() == '0' || diagBaixoEsq.text() == '1' || diagBaixoEsq.text() == '2' || diagBaixoEsq.text() == '3' || diagBaixoEsq.text() == '4' || diagBaixoEsq.text() == '5' || diagBaixoEsq.text() == '6' || diagBaixoEsq.text() == '7' || diagBaixoEsq.text() == '8') {
        diagBaixoEsq.attr('class', 'bloco-clicked')
    }
    
    if(diagBaixoDir.text() == '0' || diagBaixoDir.text() == '1' || diagBaixoDir.text() == '2' || diagBaixoDir.text() == '3' || diagBaixoDir.text() == '4' || diagBaixoDir.text() == '5' || diagBaixoDir.text() == '6' || diagBaixoDir.text() == '7' || diagBaixoDir.text() == '8') {
        diagBaixoDir.attr('class', 'bloco-clicked')
    }
}

function tiraEspacosVazios(linha, coluna) {
    checaAcima(linha, coluna)
    checaEsquerda(linha, coluna)
    checaDireita(linha, coluna)
    checaAbaixo(linha, coluna)
    checaDiagonal(linha, coluna)

    for(let i = 0; i < $('.bloco-clicked').length; i++) {
        if($('.bloco-clicked')[i].textContent == '0') {
            let l = parseInt($('.bloco-clicked')[i].getAttribute('id').split('-')[1])
            let c = parseInt($('.bloco-clicked')[i].getAttribute('id').split('-')[3])

            checaAcima(l, c)
            checaEsquerda(l, c)
            checaDireita(l, c)
            checaAbaixo(l, c)
            checaDiagonal(l, c)
        }
    }
}

function adicionarBlocos(qtdLinhas, tamanhoLinhas) {
    for(let i = 0; i < qtdLinhas; i++) {
        $('#jogo').append(`<div class="linha-${i + 1}"></div>`)
        const linha = []
        for(let j = 0; j < tamanhoLinhas; j++) {
            linha.push(`<div class="bloco" id="l-${i + 1}-c-${j + 1}" bloco-mina="false" onmousedown="clique('l-${i + 1}-c-${j + 1}')"></div>`)
        }
        $(`.linha-${i + 1}`).append(linha)
    }
}

function colocarNumeros(linhaBloco, colunaBloco) {
    if($(`#l-${linhaBloco}-c-${colunaBloco}`).attr('bloco-mina') == 'true') {
        $(`#l-${linhaBloco}-c-${colunaBloco}`).text('boom')
    } else {
        let minasAoRedor = 0

        const acimaEsquerda = $(`#l-${linhaBloco - 1}-c-${colunaBloco - 1}`)
        const acima = $(`#l-${linhaBloco - 1}-c-${colunaBloco}`)
        const acimaDireita = $(`#l-${linhaBloco - 1}-c-${colunaBloco + 1}`)
        const esquerda = $(`#l-${linhaBloco}-c-${colunaBloco - 1}`)
        const direita = $(`#l-${linhaBloco}-c-${colunaBloco + 1}`)
        const abaixoEsquerda = $(`#l-${linhaBloco + 1}-c-${colunaBloco - 1}`)
        const abaixo = $(`#l-${linhaBloco + 1}-c-${colunaBloco}`)
        const abaixoDireita = $(`#l-${linhaBloco + 1}-c-${colunaBloco + 1}`)

        if(acimaEsquerda.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(acima.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(acimaDireita.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(esquerda.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(direita.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(abaixoEsquerda.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(abaixo.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }
        if(abaixoDireita.attr('bloco-mina') == 'true') {
            minasAoRedor += 1
        }

        $(`#l-${linhaBloco}-c-${colunaBloco}`).text(minasAoRedor)
    }
}

function clique(id) {
    if(event.button == 0) {
        if($(`#${id}`).text() == 'x') {
            event.preventDefault()
        } else {
            $(`#${id}`).attr('class', 'bloco-clicked')
            if($(`#${id}`).attr('bloco-mina') == 'true') {
                for(let i = 0; i < $('div[bloco-mina="true"]').length; i++) {
                    $('div[bloco-mina="true"]')[i].setAttribute('class', 'bloco-mina-game-over')
                    if($('div[bloco-mina="true"]')[i].textContent == 'x') {
                        $('div[bloco-mina="true"]')[i].textContent = 'boom'
                    }
                }
                $(`#${id}`).attr('class', 'bloco-mina-clicked')

                alert('BOOM!')
            }
        
            if($(`#${id}`).text() == '0') {
                const l = parseInt(id.split('-')[1])
                const c = parseInt(id.split('-')[3])
                tiraEspacosVazios(l, c)
                tiraEspacosVazios(l, c)
                tiraEspacosVazios(l, c)
                tiraEspacosVazios(l, c)
                tiraEspacosVazios(l, c)
            }
        
            if((linhas * colunas) - $('.bloco-clicked').length == $('div[bloco-mina="true"]').length) {
                for(let i = 0; i < $('div[bloco-mina="true"]').length; i++) {
                    $('div[bloco-mina="true"]')[i].setAttribute('class', 'bloco-clicked-bandeira')
                    if($('div[bloco-mina="true"]')[i].textContent == 'x') {
                        $('div[bloco-mina="true"]')[i].textContent = 'boom'
                    }
                }
                alert('Você venceu!!')
            }
        }
        
    } else if(event.button == 2) {
        contador = $('div[bloco-mina="true"]').length - $('.bloco-clicked-bandeira').length - 1
        if(contador >= 0) {
            $('#contador').html(contador)
        }
        $(`#${id}`).attr('class', 'bloco-clicked-bandeira')
        if($(`#${id}`).text() == 'x') {
            let l = parseInt($(`#${id}`).attr('id').split('-')[1])
            let c = parseInt($(`#${id}`).attr('id').split('-')[3])
            
            let minasAoRedor = 0

            const acimaEsquerda = $(`#l-${l - 1}-c-${c - 1}`)
            const acima = $(`#l-${l - 1}-c-${c}`)
            const acimaDireita = $(`#l-${l - 1}-c-${c + 1}`)
            const esquerda = $(`#l-${l}-c-${c - 1}`)
            const direita = $(`#l-${l}-c-${c + 1}`)
            const abaixoEsquerda = $(`#l-${l + 1}-c-${c - 1}`)
            const abaixo = $(`#l-${l + 1}-c-${c}`)
            const abaixoDireita = $(`#l-${l + 1}-c-${c + 1}`)

            if(acimaEsquerda.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(acima.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(acimaDireita.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(esquerda.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(direita.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(abaixoEsquerda.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(abaixo.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }
            if(abaixoDireita.attr('bloco-mina') == 'true') {
                minasAoRedor += 1
            }

            $(`#l-${l}-c-${c}`).text(minasAoRedor)
            $(`#${id}`).attr('class', 'bloco')
            
            if($(`#${id}`).attr('bloco-mina') == 'true') {
                $(`#l-${l}-c-${c}`).text('boom')
            }
        } else {
            $(`#${id}`).text('x')
        }
    }
}

adicionarBlocos(linhas, colunas)
colocarMinas(20)

while(qtdMinas > 0) {
    const blocos = $('.bloco')
    for(let i = 0; i < blocos.length; i++) {
        if(qtdMinas > 0) {
            if(Math.random() > 0.90 && $('div[bloco-mina="false"]')) {
                $('.bloco')[i].setAttribute('bloco-mina', 'true')
                qtdMinas -= 1
            }
        }
    }
}

for(let i = 0; i < linhas; i++) {
    for(let j = 0; j < colunas; j++) {
        colocarNumeros(i + 1, j + 1)
    }
}

