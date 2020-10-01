document.getElementById('library').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('art_gallery').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('book_store').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('movie_theater').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('attraction').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('museum').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('stadium').onclick = function() {
    buttonSelectSearchType(this.id);
};

document.getElementById('city_hall').onclick = function() {
    buttonSelectSearchType(this.id);
};


document.getElementById('resetSearch').onclick = function() {
    resetSearch();
};


function resetFields() {
    document.getElementById('textLocation').innerHTML = "None";
    document.getElementById('textInterest').innerHTML = "None";
    $("#searchForm")[0].reset();
}
