var Node = require('./Node');

function Queue() {
    this.N = 0;
    this.first = null;
    this.last = null;
}

Queue.prototype.add = function(item) {
    var node = new Node(item);
    if (!this.first) {
        this.first = node;
        this.last = node;
    } else {
        var last = this.last;
        last.next = node;
        this.last = node;
    }
    this.N++;
}

Queue.prototype.enqueue = function(item) {
    this.add(item);
}

Queue.prototype.dequeue = function() {
    return this.remove();
}

Queue.prototype.remove = function() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) {
        var node = this.first;
        this.first = null;
        this.last = null;
        this.N--;
        return node.val;
    } else {
        var first = this.first;
        var second = this.first.next;
        this.first = second;
        this.N--;
        return first.val;
    }
}

Queue.prototype[Symbol.iterator] = function() {
    var node = this.first;
    return {
        next: function() {
            var n = node;
            if (n) node = node.next;
            return {
                value: n ? n.val : null,
                done: n == null
            }
        }
    }
}

Queue.prototype.first = function() {
    return this.first.val;
}

Queue.prototype.peek = function() {
    return this.last.val;
}

Queue.prototype.isEmpty = function() {
    return this.size() === 0;
}

Queue.prototype.size = function() {
    return this.N;
}

Queue.prototype.toString = function() {
    if (this.isEmpty()) return null;
    return this.first.toString();
}

module.exports = Queue;

function test() {
    var q = new Queue();
    q.add(1);
    q.add(2);
    q.remove();
    q.add(3);
    q.remove();
    // console.log(q.toString());
    for (var i of q) {
        console.log(i);
    }
}

if (require.main === module) test();