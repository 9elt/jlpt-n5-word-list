import { WORDLIST } from "./list";

document.documentElement.className =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "ligth";

document.querySelectorAll(".theme-button").forEach((button) =>
    button.addEventListener("click", () => {
        document.documentElement.className =
            button.dataset.theme;
    })
);

const index_ = document.querySelector("#index");
const list_ = document.querySelector("#list");

const searchForm_ = document.querySelector("#search");
const searchButton_ = document.querySelector("#search>button");
const searchInput_ = document.querySelector("#search>input");

for (const word of WORDLIST) {
    if (word.hiragana) {
        const li_ = createElement(
            "li",
            word.hiragana,
            "entry" + word.id
        );

        if (word.kanji) {
            li_.append(
                createElement(
                    "a",
                    word.kanji,
                    null,
                    "kanji",
                    "https://jisho.org/search/" + word.kanji
                )
            );
        }

        if (word.frequency) {
            li_.append(
                createElement(
                    "span",
                    "(freq. " + word.frequency + ")",
                    null,
                    "frequency"
                )
            );
        }

        li_.append(
            createElement(
                "span",
                "<pre>" + word.examples + "</pre>",
                null,
                "example"
            )
        );

        list_.append(li_);
    } else {
        const id = word.id.substring(0, 4);

        list_.append(createElement("h2", word.id, id, "title"));

        const li_ = createElement("li", word.id);

        li_.addEventListener("click", () => {
            window.scrollTo({
                top:
                    document.getElementById(id).offsetTop - 150,
                behavior: "smooth",
            });
        });

        index_.append(li_);
    }
}

function createElement(
    tagName,
    innerHTML,
    id,
    className,
    href
) {
    const elem_ = document.createElement(tagName);

    if (id) {
        elem_.id = id;
    }

    if (className) {
        elem_.className = className;
    }

    if (href) {
        elem_.href = href;
        elem_.target = "_blank";
    }

    if (innerHTML) {
        elem_.innerHTML = innerHTML;
    }

    return elem_;
}

const searchHistory = [];

searchForm_.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchStr = searchInput_.value.trim();

    if (!searchStr) {
        searchError();
        searchHistory.length = 0;
        return;
    }

    if (parseInt(searchStr) && parseInt(searchStr) < 803) {
        searchSuccess(searchStr);
    } else {
        const result = searchWord(searchStr);

        if (result) {
            searchSuccess(result);
            searchHistory.push(result);
        } else {
            searchError();
            searchHistory.length = 0;
        }
    }
});

function searchWord(searchStr) {
    for (const word of WORDLIST) {
        if (
            !searchHistory.includes(word.id) &&
            (word.hiragana?.includes(searchStr) ||
                word.examples?.includes(searchStr))
        ) {
            return word.id;
        }
    }
}

function searchSuccess(id) {
    const entry_ = document.getElementById("entry" + id);
    entry_.classList.add("success");

    window.scrollTo({
        top: entry_.offsetTop - 150,
        behavior: "smooth",
    });

    setTimeout(() => entry_.classList.remove("success"), 2500);
}

function searchError() {
    searchButton_.classList.add("error");
    searchInput_.classList.add("error");

    setTimeout(() => {
        searchButton_.classList.remove("error");
        searchInput_.classList.remove("error");
    }, 800);
}
