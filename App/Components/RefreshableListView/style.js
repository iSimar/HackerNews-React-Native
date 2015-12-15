var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1
    },
    navBarSpace: {
        height: 64,
    },
    rowContainer: {
        paddingRight: 15,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    paginationView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    loadMoreText: {
        fontSize: 15,
        color: 'gray',
    }
});
