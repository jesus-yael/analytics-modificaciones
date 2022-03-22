    function comprar() {
        numeroBoletos = prompt('¿Cuántos boletos quieres?');
        precio = numeroBoletos * 10;
        confirmacion = confirm('El costo sería de ' + precio + '. ' + '¿Desdeas confirmar la compra?');
        
        localStorage.setItem('numeroBoletos', numeroBoletos);
        localStorage.setItem('precio', precio);
        localStorage.setItem('confirmacion', confirmacion);

        var array = new Uint32Array(1);
        self.crypto.getRandomValues(array);

        console.log("Your lucky numbers:");
        for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        }

        idTransaccion = array;
        localStorage.setItem('idTransaccion', idTransaccion);

        // Data Layer

        if(confirmacion == true) {
            window.location.href = '/analytics-modificaciones/gracias.html'
        } 
        
    }

    var urlActual = window.location.pathname;
    if(urlActual == '/analytics-modificaciones/gracias.html'){
        window.dataLayer.push({
            'event':'Compra',
            'ecommerce': {
                'purchase': {
                'actionField': {
                    'id': localStorage.getItem('idTransaccion'),
                    'affiliation':'ADO Internet',
                    'revenue': localStorage.getItem('precio'),
                },
                'products': [{
                    'id': 'Producto 1',
                    'name': 'Boleto Genérico',
                    'price': '10',
                    'brand': 'Boletos ADO',
                    'category': 'Largo Recorrido',
                    "quantity": localStorage.getItem('numeroBoletos')
                }]
                }
            }
            });
    }

    function modificar() {
        idTransaccionCancel = prompt('¿Cuál es tu ID de transacción?');
        boletosComprados = prompt('¿Cuántos boletos compraste?')
        numeroBoletosCancel = prompt('¿Cuántos boletos quieres cancelar?');
        confirmarCancel = confirm('Vas a cancelar ' + numeroBoletosCancel + ' boleos. ¿Deseas confirmar?')
        // boletosPostCancel = boletosComprados - numeroBoletosCancel;
        precioCancel = numeroBoletosCancel * 10;

        localStorage.setItem('idTransaccionCancel', idTransaccionCancel);
        // localStorage.setItem('boletosPostCancel', boletosPostCancel);
        localStorage.setItem('precioCancel', precioCancel);
        localStorage.setItem('numeroBoletosCancel', numeroBoletosCancel);
        localStorage.setItem('confirmarCancel', confirmarCancel);

        if(localStorage.getItem('confirmarCancel') == true){
            window.dataLayer.push({
                'event':'Cancelación',
                'ecommerce': {
                    'purchase': {
                    'actionField': {
                        'id': localStorage.getItem('idTransaccionCancel'),
                        'affiliation':'ADO Internet',
                        'revenue': '-' + localStorage.getItem('precioCancel'),
                    },
                    'products': [{
                        'id': 'Producto 1',
                        'name': 'Boleto Genérico',
                        'price': '10',
                        'brand': 'Boletos ADO',
                        'category': 'Largo Recorrido',
                        "quantity": '-' + localStorage.getItem('numeroBoletosCancel')
                    }]
                    }
                }
                });
        }

        if(localStorage.getItem('confirmarCancel') == true) {
            window.location.href = '/analytics-modificaciones/gracias.html'
        } 
    }