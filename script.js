var app = {};

app.Square = Backbone.Model.extend({
    defaults: {
        color: '#000',
        x: 0,
        y: 0
    }
});

app.Block = Backbone.Model.extend({
    defaults: {
        color: 'red',
        shape: [],
        x: 0,
        y: 0
    },
    initialize: function() {
        this.set('shape', this.get('shape'));
    }
});

app.Grid = Backbone.Collection.extend({
    model: app.Square,
    initialize: function() {
        // Inicializa o grid 10x20 com quadrados pretos
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 10; x++) {
                this.add(new app.Square({ x: x, y: y, color: '#000' }));
            }
        }
    },
    getSquare: function(x, y) {
        return this.findWhere({ x: x, y: y });
    }
});

app.GridView = Backbone.View.extend({
    el: '#grid',
    initialize: function() {
        this.collection = new app.Grid();
        this.render();
    },
    render: function() {
        this.$el.empty();
        this.collection.each(function(square) {
            var div = $('<div class="square"></div>').css({
                width: '30px',
                height: '30px',
                border: '1px solid #ccc',
                'box-sizing': 'border-box',
                position: 'absolute',
                left: square.get('x') * 30,
                top: square.get('y') * 30,
                backgroundColor: square.get('color')
            });
            this.$el.append(div);
        }, this);
        return this;
    },
    updateSquare: function(x, y, color) {
        var square = this.collection.getSquare(x, y);
        if (square) {
            square.set('color', color);
            // Atualiza só o quadrado visual
            this.$el.children().filter(function() {
                var pos = $(this).position();
                return pos.left === x * 30 && pos.top === y * 30;
            }).css('background-color', color);
        }
    }
});

$(function() {
    var gridView = new app.GridView();

    // Exemplo: pintar um bloco vermelho na posição 5,0
    gridView.updateSquare(5, 0, 'red');

    // Para usar seu jogo, precisaria adicionar lógica para manipular os blocos,
    // mover, rotacionar e checar colisões, que você pode ir adicionando depois.
});

