
let dovizverileri = {};

//sayfanın loadına güncel tutması için  apiverisi tanımladığım fonksiyonumu atadım
window.addEventListener('load', function() {
    apikurverileri();
});


async function apikurverileri() {
   
      
        const api = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const veri = await api.json();
        
        
        dovizverileri = {
            USD: 1, 
            TL: veri.rates.TRY 
        };
   
}

// anasayfamdaki butona tanımladığım fonksiyon 
function hesapla() {
    // sabit tanımlayarak html verilerini çektim
    const miktar = parseFloat(document.getElementById('parainp').value);
    const kaynakPara = document.getElementById('parabirimi').value;
    const hedefPara = document.getElementById('cevirilecekbirim').value;
    const sonucDiv = document.getElementById('gozukecekpara');
    





    //eğer miktar harf veya 0dan azsa reddetmesi için bir döngü kullandım
    if (isNaN(miktar) || miktar <= 0) {
        sonucDiv.innerHTML = '<p style="color: red;">Lütfen geçerli bir miktar girin!</p>';
        return;
    }
    
    // Aynı para birimi dönüştürülürse hata vermemesi için bu döngüyü kullandım
    if (kaynakPara === hedefPara) {
        sonucDiv.innerHTML = `<p">${miktar} ${kaynakPara}</p>`;
        return;
    }
    
    

    let sonuc;

    if (kaynakPara === 'USD' && hedefPara === 'TL') {
        sonuc = miktar * dovizverileri.TL;
    } 
    
    
    else if (kaynakPara === 'TL' && hedefPara === 'USD') {
        sonuc = miktar / dovizverileri.TL;
    }

    
// tüm bu şartları tamamladıktan sonra  para sonuç değişkenimi yukarda tanımladım. ardından html sayfamda açtığım sonucdivine innerhtml ile alttaki kodu yazdım.
    const paraSonuc = sonuc.toFixed(2);
    sonucDiv.innerHTML = `
        <div style="margin-top: 20px; padding: 15px;background-color: #f8f9fa;border-radius: 5px;">
            <h5 style="color: #007bff;
             margin-bottom: 10px;">Çevrim Sonucu</h5>

            <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">
                ${miktar} ${kaynakPara} = ${paraSonuc} ${hedefPara}
            </p>
           
        </div>
    `;
}



