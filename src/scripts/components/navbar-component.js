class Navbar extends HTMLElement {

    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `
        <!-- Image and text -->
        <div class="container">
            <nav class="navbar navbar-light bg-white">
                <a class="navbar-brand" href="#">
                <img src="src/assets/img/movie.png" width="30" height="30" class="d-inline-block align-top" alt="">
                Movielist.org
                </a>
            </nav>
        </div>
        `;
    }
}

customElements.define("navbar-component", Navbar);