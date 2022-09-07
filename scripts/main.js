fav_theme();
render();
search();

//  render list

function render() {

    let idx = document.getElementById('indexes');

    let ul = document.getElementById('list');

    LIST.forEach(word => {

        word.hiragana ? create_entry(word, ul) : create_title(word, ul, idx);
    });
}

function create_entry(word, ul) {

    let entry = create_element('li', word.hiragana, 'entry-' + word.order);

    if (word.kanji) {

        entry.append( create_element('a', word.kanji, null, 'kanji', word.jisho) );
    }

    if (word.frequency) {

        entry.append( create_element('span', '(' + word.frequency + ')', null, 'freq') );
    }

    entry.append( create_element('span', '<pre>' + word.examples + '</pre>', null, 'example') );

    ul.append(entry);
}

function create_title(word, ul, idx) {

    let id = word.order.substring(0, 4);

    ul.append( create_element('h2', word.order, id, 'title') );

    let li = create_element('li', word.order);

    li.addEventListener('click', function () {

        scetion = document.getElementById(id);

        window.scrollTo({
            top: scetion.offsetTop - 150,
            behavior: 'smooth'
        });

    });

    idx.append(li);
}

function create_element(type, html, id, hclass, href) {

    let element = document.createElement(type);

    if (id) element.id = id;

    if (hclass) element.className = hclass;

    if (href) { element.href = href; element.target = '_'; }

    if (html) element.innerHTML = html;

    return element;
}

//  search

function search() {

    let search = document.getElementById('search');

    let src_btn = document.getElementById('search-btn');

    let history = [];

    search.addEventListener('submit', function (e) {

        e.preventDefault();

        let src_val = document.getElementById('search-val');

        src_val = (src_val.value).trim();

        if (!src_val) return search_err(src_btn);

        if (parseInt(src_val) && parseInt(src_val) < 803) {

            scroll_to_result(src_val);

        } else {
        
            let result = search_word(src_val, history);

            result ? history.push(result) : history = search_err(src_btn);

        }
    });
}

function search_word(value, history) {

    for (i = 0; i < LIST.length; i++) {

        let word = LIST[i];

        let translation = (word.examples).substring(0, 20);

        if (
            translation.includes(value) 
            || word.hiragana.includes(value)
        ) {

            if (history.includes(word.order)) continue;
            
            scroll_to_result(word.order);

            return word.order;
        }
    }
}

function scroll_to_result(pos) {

    let result = document.getElementById('entry-' + pos);

    result.style = 'background-color: #61a3493a;';

    window.scrollTo({
        top: result.offsetTop - 150,
        behavior: 'smooth'
    });

    setTimeout(function () { result.style = ''; }, 2500);
}

function search_err(src_btn) {

    src_btn.style = 'background-color: #d34242fa; fill: #fff;';

    setTimeout(function () { src_btn.style = ''; }, 800);

    return [];
}

//  theme switch

function fav_theme() {

    let media = '(prefers-color-scheme: dark)';

    let fav_dark = window.matchMedia && window.matchMedia(media).matches;

    set_theme(fav_dark ? 'dark' : 'ligth');

    theme_switch();
}

function theme_switch() {

    let themes = document.querySelectorAll('.theme-btn');

    themes.forEach(theme => {
        
        theme.addEventListener('click', function () {

            set_theme(this.dataset.theme);

        });

    });
}

function set_theme(type) {

    document.documentElement.className = type;
}