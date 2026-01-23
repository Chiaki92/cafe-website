<script>
    // 1. 要素を取得する（ボタン、メニュー、背景、リンク）
    const hamburgerBtn = document.getElementById('js-hamburger');
    const drawerMenu = document.getElementById('js-drawer');
    const overlay = document.getElementById('js-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // 2. 「開閉」を切り替える関数を作る
    function toggleDrawer() {
        hamburgerBtn.classList.toggle('active'); // ボタンを×印に変える/戻す
        drawerMenu.classList.toggle('active');   // メニューを出す/隠す
        overlay.classList.toggle('active');      // 背景を暗くする/戻す
    }

    // 3. クリックしたら動くように設定する
    // ボタンを押した時
    hamburgerBtn.addEventListener('click', toggleDrawer);
    
    // 背景（暗い部分）を押した時も閉じるようにする
    overlay.addEventListener('click', toggleDrawer);

    // メニューの中のリンクを押した時も閉じるようにする
    navLinks.forEach(link => {
        link.addEventListener('click', toggleDrawer);
    });

    // ▼▼▼ スライドショーの制御 ▼▼▼
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('js-next');
    const prevBtn = document.getElementById('js-prev');
    const dotsContainer = document.getElementById('js-dots');
    
    let currentSlide = 0;
    let slideInterval;

    // 1. 丸い点々（ドット）を画像の数だけ自動で作る
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    // 2. スライドを切り替える関数
    function goToSlide(n) {
        // 現在のactiveクラスを外す
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // 次の番号を計算（ループさせる）
        currentSlide = (n + slides.length) % slides.length;
        
        // 新しいスライドにactiveクラスをつける
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // 手動で操作したら、タイマーをリセットする（変なタイミングで切り替わらないように）
        resetTimer();
    }

    // 3. 次へ・前へボタンの動作
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

    // 4. 自動再生タイマー（5秒ごとに切り替え）
    function startTimer() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // 5000ms = 5秒
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // ページが開いたらタイマースタート
    startTimer();
    
</script>