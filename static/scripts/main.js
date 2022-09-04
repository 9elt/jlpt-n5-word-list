preferred_theme();
render_list();
search();

//  render list

function render_list() {

    let idx = document.getElementById('indexes');

    let ul = document.getElementById('list');

    LIST.forEach(word => {

        word.hiragana ? create_entry(word, ul) : create_title(word, ul, idx);

    });
}

function create_entry(word, ul) {

    let li = document.createElement('li');

    li.id = 'entry-' + word.order;

    li.innerHTML += word.hiragana;

    if (word.kanji) {

        li.innerHTML += '<a class="kanji" href="' + word.jisho + '" target="_"> ' + word.kanji + ' </a>';
    }

    if (word.frequency) {

        li.innerHTML += '<span class="freq">(' + word.frequency + ')</span>';
    }

    li.innerHTML += '<br><span class="example"><pre>' + word.examples + '</pre></span>';

    ul.append(li);
}

function create_title(word, ul, idx) {

    let h2 = document.createElement('h2');

    h2.innerHTML += word.order;

    h2.id = word.order.substring(0, 4);

    h2.className = 'title';

    ul.append(h2);

    let li = document.createElement('li');

    li.innerHTML += '' + word.order + '';

    li.addEventListener('click', function () {

        scetion = document.getElementById(word.order.substring(0, 4));

        window.scrollTo({
            top: scetion.offsetTop - 150,
            behavior: 'smooth'
        });

    });

    idx.append(li);
}

//  search

function search() {

    let search = document.getElementById('search-btn');

    search.addEventListener('click', function () {

        let input = document.getElementById('search-val');

        if (parseInt(input.value) && parseInt(input.value) < 803) {

            search_position(input.value);

        } else {
        
            search_word((input.value).toLowerCase());

        }

    });
}

function search_position(value) {

    scroll_to_result(value);

}

function search_word(value) {

    LIST.forEach(word => {

        for (i = 0; i < LIST.length; i++) {

            word = LIST[i];

            let translation = (word.examples).substring(0, 20);

            if (
                (translation.toLowerCase()).includes(value) 
                || ((word.hiragana).toLowerCase()).includes(value)
            ) {

                scroll_to_result(word.order);
    
                return;
            }
        }

    });
}

function scroll_to_result(position) {

    let result = document.getElementById('entry-' + position);

    result.style = 'background-color: #61a3493a;';

    window.scrollTo({
        top: result.offsetTop - 150,
        behavior: 'smooth'
    });

    setTimeout(function () {

        result.style = '';

    }, 2500);
}

//  theme switch

function preferred_theme() {

    if (
        window.matchMedia
        && window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {

        switch_theme();

    } else {

        switch_theme('light');

    }

    change_theme();
}

function change_theme() {

    let themes = document.getElementsByClassName('theme');

    themes = [themes[0], themes[1]];

    themes.forEach(theme => {
        
        theme.addEventListener('click', function () {

            if (this.dataset.theme == 'dark') {

                switch_theme();

            } else {

                switch_theme('light');

            }

        });

    });
}

function switch_theme(type = 'dark') {

    if (type == 'dark') {

        document.body.style = '--bg: #1d1d1d;--color: #fffb;--header: #1117;';

    } else {

        document.body.style = '--bg: #fdfdfd;--color: #000b;--header: #fffa;';

    }

}
