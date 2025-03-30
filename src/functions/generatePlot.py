import sys
import json
import numpy as np
import re
import matplotlib.pyplot as plt
import base64
from io import BytesIO

def plotar_grafico_para_buffer(expressao_str, x_min=-10, x_max=10, num_pontos=1000):
    """
    Plota o gráfico e retorna a imagem como uma string Base64.
    """

    x = np.linspace(x_min, x_max, num_pontos)
    
    # Substitui "2x" por "2*x" para avaliação correta
    expressao_str = re.sub(r'(\d+)([x])', r'\1*\2', expressao_str)

    try:
        y = eval(expressao_str, {'x': x, 'np': np})
    except Exception as e:
        print(f"Erro ao avaliar a expressão: {e}")
        return None
    
    # Cria a figura e plota
    plt.figure(figsize=(10, 6))
    plt.plot(x, y, label=f"$y = {expressao_str}$", color='blue')
    plt.title(f"Gráfico de $y = {expressao_str}$")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.grid(True)
    plt.legend()

    # Salva a imagem em um buffer (BytesIO)
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    plt.close()  # Fecha a figura para liberar memória

    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    data = {
        "plot": "" + img_base64
    }
    print(json.dumps(data)) 

# Exemplo de uso
if __name__ == "__main__":

    args = sys.argv[1:]
    img_base64 = plotar_grafico_para_buffer(args[0])