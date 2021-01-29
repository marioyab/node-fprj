function Pager(tableName, itemsPerPage, pagerName) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.pagerName = pagerName;
    this.maxPages = 5;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;

    this.showRecords = (from, to) => {        
        var rows = document.getElementById(tableName).rows
        for (var i = 1; i < rows.length; i++) {
            if (i < from || i > to)   
                rows[i].style.display = 'none';
            else {
                if (!rows[i].classList.contains('invisible')) 
                    rows[i].style.display = '';
            }
                
        }
    }

    this.showPage = function(pageNumber) {
        if (! this.inited) {
            alert("not inited");
            return;
        }

        this.showPageNav(pageNumber);

        var oldPageAnchor = document.getElementById('pg'+this.currentPage);
        if (oldPageAnchor) {
            oldPageAnchor.className = 'pg-normal';
        }

        this.currentPage = pageNumber;
        var newPageAnchor = document.getElementById('pg'+this.currentPage);
        newPageAnchor.className = 'pg-selected';

        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + parseInt(itemsPerPage) - 1;
        this.showRecords(from, to);
    }   

    this.prev = function() {
        if (this.currentPage > 1)
            this.showPage(this.currentPage - 1);
    }

    this.next = function() {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    }                        

    this.init = function() {
        var rows = document.getElementById(tableName).rows;
        var records = (rows.length - 1); 
        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    }

    this.showPageNav = function(pageNumber) {
        if (! this.inited) {
            alert("not inited");
            return;
        }
        var element = document.getElementById(this.pagerName);
        var firstPage = parseInt(Math.max(pageNumber - this.maxPages / 2, 1));
        var lastPage = parseInt(firstPage + this.maxPages - 1);
        if (lastPage > this.pages) {
            lastPage = this.pages;
            firstPage = lastPage - this.maxPages;
            if (firstPage < 1) {
                firstPage = 1;
            }
        }
        var pager = this;
        element.innerHTML = '';
        element.appendChild(newSpan(' &#171 ', 'pg-ctrl', function () {
            pager.prev();
        }));
        for (var page = firstPage; page <= lastPage; page++) {
            element.appendChild(newSpan(page.toString(), 'pg-normal', changePage(pager, page)));
        }
        element.appendChild(newSpan(' &#187 ', 'pg-ctrl', function () {
            pager.next();
        }));
    }
}

function changePage (pager, page) {
    return function () {
        pager.showPage(page);
    };
}

function newSpan(text, className, onClick) {
    var span = document.createElement('span');
    span.id = 'pg' + text;
    span.innerHTML = text;
    span.className = className;
    span.onclick = onClick;
    return span;
}

/*function fillTable(id) {
    var table = document.getElementById(id);
    var html = '';
    for (var i = 0; i < 100; i++) {
        html += '<tr><td>' + (i + 1) + '</td></tr>';
    }
    table.innerHTML = html;
}*/