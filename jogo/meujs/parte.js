//variaveis do jogo
		//altrura e largura serão usadas para pegar a janela do usuário
		//os frames serão constantementes atualizados
		var canvas, ctx, ALTURA, LARGURA,frames=0,maxPulos=3,
		
		chao = {
			y:550,
			altura:50,
			cor:"#ffdf75",

			desenha:function(){
				ctx.fillStyle = this.cor;
				ctx.fillRect(0,this.y, LARGURA, this.altura);
			}
		},

		bloco = {
			x:50,
			y:0,
			altura:50,
			largura:50,
			cor:"#ff4e4e",
			gravidade:1.5,
			velocidade:0,
			forcaPulo: 15,
			qtdPulo:0,

			atualiza:function(){
				this.velocidade+=this.gravidade;
				this.y += this.velocidade;

				if(this.y>chao.y-this.altura){
					this.y = chao.y - this.altura;
					this.qtdPulo=0;
				}
			},

			desenha:function(){
				ctx.fillStyle = this.cor;
				ctx.fillRect(this.x, this.y, this.largura, this.altura);
			},

			pulo: function(){
				if(this.qtdPulo<maxPulos){
					this.velocidade = -this.forcaPulo;
					this.qtdPulo++;
				}
				
			}
		};

		function clique(event){
			bloco.pulo()
		}

		function main(){
			LARGURA = window.innerWidth;
			ALTURA = window.innerHeight;

			if(LARGURA>=500){
				LARGURA = 600;
				ALTURA = 600;
			}

			canvas = document.createElement("canvas");
			canvas.width=LARGURA;
			canvas.height = ALTURA;
			canvas.style.border="1px solid #000";


			ctx = canvas.getContext("2d");
			document.body.appendChild(canvas);

			document.addEventListener("mousedown", clique);

			roda();
		}

		function roda(){
			atualiza();
			desenha();

			window.requestAnimationFrame(roda);
		}

		function atualiza(){
			frames++;

			bloco.atualiza();
		}

		function desenha (){
			ctx.fillStyle = "#50beff";
			ctx.fillRect(0,0,LARGURA, ALTURA);

			//desenha o chão
			chao.desenha();
			//desenha o bloco
			bloco.desenha();
		}

		//inicia o jogo
		main();