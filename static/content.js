class Content {
    constructor() {
        this.init()
        this.ray()
        this.kolory = ["white", "white", "white", "white"]
        this.checks = ["sz", "sz", "sz", "sz"]
        this.runda = 1
    }
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x292929);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(this.renderer.domElement);
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2()
        this.render()
        this.camera.position.set(100, 80, -22)
        this.camera.lookAt(0, 0, -22)
        $(window).resize(() => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    pole_gry() {
        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 4; j++) {
                var geometry = new THREE.BoxGeometry(10, 1, 10);
                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: new THREE.TextureLoader().load('mats/cc.jpg'),
                    transparent: true,
                    opacity: 1,
                })
                var cube = new THREE.Mesh(geometry, material);
                cube.position.set(i * 10 - 40, 0, j * 10 - 40)
                this.scene.add(cube);
            }
        }
        var geometry1 = new THREE.BoxGeometry(115, 1, 70);
        var material1 = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('mats/met.jpg'),
            transparent: true,
            opacity: 1,
        })
        var cube = new THREE.Mesh(geometry1, material1);
        cube.position.set(9, -0.1, -35)
        this.scene.add(cube);
    }
    kwadraciki1() {

        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 4; j++) {
                var row = 10 - i
                var geometry = new THREE.BoxGeometry(5, 1, 5);
                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: new THREE.TextureLoader().load('mats/checks/sz.jpg'),
                    transparent: true,
                    opacity: 0.8,
                })
                row = row + 1
                var cube = new THREE.Mesh(geometry, material);
                cube.name = "c" + i + "/" + j + row
                cube.position.set(i * 10 - 40, 0, j * 5 - 65)
                this.scene.add(cube);
                console.log(row);
            }
        }
    }
    kwadraciki2() {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 4; j++) {
                var geometry = new THREE.BoxGeometry(5, 1, 5);
                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: new THREE.TextureLoader().load('mats/checks/sz.jpg'),
                    transparent: true,
                    opacity: 0.8,
                })
                var cube = new THREE.Mesh(geometry, material);
                cube.position.set(i * 10 - 40, 0, j * 5 - 65)
                this.scene.add(cube);
            }
        }
    }
    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
    szarekule() {
        for (var i = 0; i < 4; i++) {
            const geometry = new THREE.SphereGeometry(3.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('mats/kule/s.jpg'),
                transparent: true,
                opacity: 1,
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(62, 4, (i * 10 - 40) + 0.1)
            this.scene.add(sphere);
        }
    }

    bialekule() {
        this.kolory = ["white", "white", "white", "white"]
        for (var i = 0; i < 4; i++) {
            const geometry = new THREE.SphereGeometry(3.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('mats/kule/white.jpg'),
                transparent: true,
                opacity: 1,
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(62, 4, (i * 10 - 40) + 0.1)
            sphere.name = "k" + i + "/" + this.runda
            this.scene.add(sphere);
        }
        let bt = $("<button>")
        bt.prop('id', 'bt1')
        bt.append("SEND")
        $("#root").append(bt)
        bt.on("click", () => {
            this.runda++
            plansza.wysylanieKolorow(this.kolory)
            bt.remove()
        }
        )
    }

    ray() {

        $(document).mousedown((event) => {
            this.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            this.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            var intersects = this.raycaster.intersectObjects(this.scene.children);
            //console.log(intersects.length);

            if (intersects[0] == undefined) { }
            else if (intersects[0].object.name == "k0/" + this.runda || intersects[0].object.name == "k1/" + this.runda || intersects[0].object.name == "k2/" + this.runda || intersects[0].object.name == "k3/" + this.runda) {
                console.log(this.runda);
                console.log(this.mouseVector.x, this.mouseVector.y);
                var klik = intersects[0].object
                var nazwaKuli = klik.name
                var x = klik.position.x
                var y = klik.position.y
                var z = klik.position.z
                this.scene.remove(klik)

                const geometry = new THREE.SphereGeometry(3.5, 32, 32);
                var numerNazwy = nazwaKuli.slice(1, 2)
                if (this.kolory[numerNazwy] == "white") {
                    this.kolory[numerNazwy] = "blue"
                }
                else if (this.kolory[numerNazwy] == "blue") {
                    this.kolory[numerNazwy] = "green"
                }
                else if (this.kolory[numerNazwy] == "green") {
                    this.kolory[numerNazwy] = "orange"
                }
                else if (this.kolory[numerNazwy] == "orange") {
                    this.kolory[numerNazwy] = "pink"
                }
                else if (this.kolory[numerNazwy] == "pink") {
                    this.kolory[numerNazwy] = "red"
                }
                else if (this.kolory[numerNazwy] == "red") {
                    this.kolory[numerNazwy] = "yellow"
                }
                else if (this.kolory[numerNazwy] == "yellow") {
                    this.kolory[numerNazwy] = "brown"
                }
                else if (this.kolory[numerNazwy] == "brown") {
                    this.kolory[numerNazwy] = "lightblue"
                }
                else if (this.kolory[numerNazwy] == "lightblue") {
                    this.kolory[numerNazwy] = "lightorange"
                }
                else if (this.kolory[numerNazwy] == "lightorange") {
                    this.kolory[numerNazwy] = "lightpink"
                }
                else if (this.kolory[numerNazwy] == "lightpink") {
                    this.kolory[numerNazwy] = "white"
                }
                const material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: new THREE.TextureLoader().load('mats/kule/' + this.kolory[numerNazwy] + '.jpg'),
                    transparent: true,
                    opacity: 1,
                });
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(x, y, z)
                sphere.updateMatrixWorld();
                sphere.name = nazwaKuli
                this.scene.add(sphere);
            }
            else {
                for (var i = 0; i < 11; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (this.runda == 1) {
                            console.log("pierwsza runda");
                        }
                        else if (intersects[0].object.name == "c" + i + "/" + j + this.runda) {
                            var klik = intersects[0].object
                            console.log(this.runda);
                            console.log(klik.name)
                            var nazwaKuli = klik.name
                            var x = klik.position.x
                            var y = klik.position.y
                            var z = klik.position.z
                            this.scene.remove(klik)
                            var geometry = new THREE.BoxGeometry(5, 1, 5);

                            var numerNazwy = j
                            if (this.checks[numerNazwy] == "sz") {
                                this.checks[numerNazwy] = "green"
                            }
                            else if (this.checks[numerNazwy] == "green") {
                                this.checks[numerNazwy] = "yellow"
                            }
                            else if (this.checks[numerNazwy] == "yellow") {
                                this.checks[numerNazwy] = "red"
                            }
                            else if (this.checks[numerNazwy] == "red") {
                                this.checks[numerNazwy] = "green"
                            }

                            var material = new THREE.MeshBasicMaterial({
                                side: THREE.DoubleSide,
                                map: new THREE.TextureLoader().load('mats/checks/' + this.checks[numerNazwy] + '.jpg'),
                                transparent: true,
                                opacity: 0.8,
                            })
                            const sphere = new THREE.Mesh(geometry, material);
                            sphere.position.set(x, y, z)
                            sphere.updateMatrixWorld();
                            sphere.name = nazwaKuli
                            this.scene.add(sphere);
                        }
                    }
                }

            }
        }
        )
    }

    nastepneKule(data1) {
        if (data1 <= 10) {
            if (this.player == "drugi") {
                this.kolory = ["white", "white", "white", "white"]
                for (var i = 0; i < 4; i++) {
                    const geometry = new THREE.SphereGeometry(3.5, 32, 32);
                    const material = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/kule/white.jpg'),
                        transparent: true,
                        opacity: 1,
                    });
                    const sphere = new THREE.Mesh(geometry, material);
                    sphere.position.set(62 - (10 * data1), 4, (i * 10 - 40) + 0.1)
                    sphere.name = "k" + i + "/" + this.runda
                    this.scene.add(sphere);

                }
            }
            else if (this.player == "pierwszy") {

            }

        }
        if (this.player == "drugi") {
            let bt = $("<button>")
            bt.prop('id', 'bt2')
            bt.append("SEND")
            $("#root").append(bt)
            bt.on("click", () => {
                this.runda++
                plansza.wysylanieKolorow(this.kolory)
                bt.remove()
            }
            )
        }
        else if (this.player == "pierwszy") {
            let bt = $("<button>")
            bt.prop('id', 'bt2')
            bt.append("SEND")
            $("#root").append(bt)
            bt.on("click", () => {
                this.runda++
                plansza.wysylanieKolorow(this.checks)
                bt.remove()
            }
            )
        }
    }
    zmiana_gracza(zmiana) {
        if (zmiana == false) {
        }
        else {
            var int = setInterval(() => {
                console.log("sprrrawdzanie")
                plansza.czekaj_zmiana(int, this.player)
            }, 1000);
        }
    }

    koloroweKule(data1, tablica) {
        if (data1 <= 10) {
            if (this.player == "pierwszy") {
                this.checks = ["sz", "sz", "sz", "sz"]
                for (var i = 0; i < 4; i++) {
                    const geometry = new THREE.SphereGeometry(3.5, 32, 32);
                    const material = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/kule/' + tablica[i] + '.jpg'),
                        transparent: true,
                        opacity: 1,
                    });
                    const sphere = new THREE.Mesh(geometry, material);
                    sphere.position.set(62 - (10 * data1), 4, (i * 10 - 40) + 0.1)
                    // sphere.name = "k" + i + "/" + this.runda
                    this.scene.add(sphere);
                    console.log("aa");
                }
            }
            else if (this.player == "drugi") {
                for (var i = 0; i < 4; i++) {
                    var geometry = new THREE.BoxGeometry(5, 1, 5);
                    var material = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/checks/' + tablica[i] + '.jpg'),
                        transparent: true,
                        opacity: 0.8,
                    })
                    var j = 11 - data1
                    var cube = new THREE.Mesh(geometry, material);
                    cube.position.set(j * 10 - 40, 0, i * 5 - 65)
                    this.scene.add(cube);
                }
            }
        }
    }
}



