function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    //center shapes and coordinates
    var redd = color(255, 120, 120);
    var grn = color(158, 255, 158);
    var blu = color(191, 191, 255);
    var white = color(255, 255, 255);
    var book = [{
            title: "Aladin 0",
            stars: 4,
            author: "Me",
            cover: redd,
            r: 1
        },
        {
            title: "Aladin 1",
            stars: 2,
            author: "Me",
            cover: grn,
            r: 0
        },
        {
            title: "Aladin 2",
            stars: 4,
            author: "Me",
            cover: grn,
            r: 1
        },
        {
            title: "Aladin 3",
            stars: 1,
            author: "Me",
            cover: blu,
            r: 0
        },
        {
            title: "Aladin 4",
            stars: 0,
            author: "Me",
            cover: redd,
            r: 0
        },
        {
            title: "Aladin 5",
            stars: 4,
            author: "Me",
            cover: redd,
            r: 0
        },
        {
            title: "Aladin 6",
            stars: 4,
            author: "Me",
            cover: grn,
            r: 1
        },
        {
            title: "Aladin 7",
            stars: 3,
            author: "Me",
            cover: blu,
            r: 0
        },
        {
            title: "Aladin 8",
            stars: 2,
            author: "Me",
            cover: blu,
            r: 0
        },
        {
            title: "Aladin 9",
            stars: 4,
            author: "Me",
            cover: redd,
            r: 1
        },
    ];

    // draw shelf
    fill(173, 117, 33);
    rect(0, 120, width, 10);
    rect(0, 240, width, 10);
    rect(0, 360, width, 10);

    // draw books
    if (book.length > 4) {
        for (var k = 0; k < floor(book.length / 4); k++) {
            var y = k * 120 + 20;
            for (var i = 0; i < 4; i++) {
                var x = i * 100 + 5;
                var bIndex = floor((i + k * 4));
                fill(book[bIndex].cover);
                rect(x, y, 90, 100);
                fill(0, 0, 0);
                text(book[bIndex].title, x + 5, y + 10, 70, 100);
                text(book[bIndex].author, x + 5, y + 30, 70, 100);
            }
        }
        var y2 = k * 120 + 20;
        for (var i2 = 0; i2 < (book.length % 4); i2++) {
            var x2 = i2 * 100 + 5;
            bIndex = (book.length - (book.length % 4) + i2);
            fill(book[bIndex].cover);
            rect(x2, y2, 90, 100);
            fill(0, 0, 0);
            var bTitle = book[bIndex].title;
            var bStars = book[bIndex].stars;
            var bAuthor = book[bIndex].author;
            text(bTitle, x2 + 5, y2 + 10, 70, 100);
            text(bAuthor, x2 + 5, y2 + 30, 70, 100);
        }

    }
}