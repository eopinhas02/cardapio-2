import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { listarRestaurantes } from '../lib/restaurantes.js'
import './AdminQr.css'

// Página interna (B4): gera o QR code de cada restaurante e baixa como PNG para a placa.
// O QR aponta para o endereço do site em que a página está aberta (window.location.origin),
// então gere os QRs pela versão publicada, não pelo localhost.
const restaurantes = listarRestaurantes()

// 1024px dá boa qualidade de impressão; margin 4 é a borda branca recomendada pelo padrão QR.
const OPCOES_QR = { width: 1024, margin: 4, errorCorrectionLevel: 'M' }

export default function AdminQr() {
  const origem = window.location.origin
  const ehLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)

  return (
    <main className="admin-qr">
      <h1>QR codes dos restaurantes</h1>
      {ehLocal && (
        <p className="admin-qr__aviso">
          Atenção: você está no localhost, então estes QRs só funcionam neste computador. Para
          as placas, gere pela versão publicada do site.
        </p>
      )}
      <ul className="admin-qr__lista">
        {restaurantes.map((r) => (
          <CartaoQr key={r.slug} restaurante={r} url={`${origem}/r/${r.slug}`} />
        ))}
      </ul>
    </main>
  )
}

function CartaoQr({ restaurante, url }) {
  const [imagem, setImagem] = useState(null)

  useEffect(() => {
    let ativo = true // evita setState se o componente sair da tela antes de terminar
    QRCode.toDataURL(url, OPCOES_QR)
      .then((dataUrl) => ativo && setImagem(dataUrl))
      .catch((erro) => console.error(`[admin/qr] falha ao gerar QR de ${url}:`, erro))
    return () => {
      ativo = false
    }
  }, [url])

  return (
    <li className="admin-qr__cartao">
      <h2>{restaurante.nome}</h2>
      <p className="admin-qr__url">{url}</p>
      {restaurante.modo === 'externo' && (
        <p className="admin-qr__modo">Modo externo: redireciona para {restaurante.urlExterna}</p>
      )}
      {imagem ? (
        <>
          <img className="admin-qr__imagem" src={imagem} alt={`QR code de ${restaurante.nome}`} />
          <a className="admin-qr__baixar" href={imagem} download={`qr-${restaurante.slug}.png`}>
            Baixar PNG
          </a>
        </>
      ) : (
        <p>Gerando QR…</p>
      )}
    </li>
  )
}
