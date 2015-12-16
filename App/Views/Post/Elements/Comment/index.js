var React = require('react-native');

var {
    Text,
    View,
    TouchableHighlight
} = React;

var api = require("../../../../Network/api.js");

var styles = require('./style');

var Comment = React.createClass({
	displayName: 'Comment',
	getInitialState: function(){
		return {
			subCommentsLoading: false,
			subCommentsHidden: true,
			subCommentsData: null,
			level: this.props.level ? this.props.level : 1
		};
	},
    render: function(){
        return(
        	<View style={styles.commentOuterContainer}>
				<View style={[styles.commentInnerContainer, {marginLeft: this.state.level == 1 ? 10 : 20*this.state.level}]}>
					<Text style={styles.commentBy}>
						{this.props.data.by}:
					</Text>
					<Text style={styles.commentText}>
						{this.props.data.text}
					</Text>
					{this.renderRepliesControlButton()}
				</View>
				{this.renderSubComments()}
			</View>
        );
    },
    getRepliesControlButtonText: function(){
		if(!this.state.subCommentsHidden){
	    	return(
	    		<Text style={styles.showRepliesButtonText}>
	    			Hide Replies
	    		</Text>
	    	);
	    }
	    else{
	    	return(
	    		<Text style={styles.showRepliesButtonText}>
	    			Show Replies ({this.props.data.kids.length})
	    		</Text>
	    	);
	    }
    },
    renderRepliesControlButton: function(){
    	if(this.state.subCommentsLoading){
    		return(
	    		<Text style={styles.showRepliesButtonText}>
	    			Loading Replies...
	    		</Text>
	    	);
    	}
    	if(this.props.data.kids){
    		return(
	    		<TouchableHighlight onPress={()=>this.onShowReplies()}
										style={styles.showRepliesButton}
										underlayColor='#F6F6EF'>
					{this.getRepliesControlButtonText()}
				</TouchableHighlight>
			);
    	}
    	else{
    		return(<View />);
    	}
    },
    renderSubComments: function(){
    	if(!this.state.subCommentsData || this.state.subCommentsHidden){
    		return(<View/>);
    	}
    	return(
    		<View>
    			{this.state.subCommentsData.map(subComment => <Comment data={subComment} level={this.state.level+1} key={subComment.count}/>)}
    		</View>
    	);
    },
    onShowReplies: function(){
    	if(this.state.subCommentsData && this.state.subCommentsHidden){
    		this.setState({
    			subCommentsHidden: false
    		});
    	}
    	else if(this.state.subCommentsData && !this.state.subCommentsHidden){
    		this.setState({
    			subCommentsHidden: true
    		});
    	}
    	else{
    		this.setState({
    			subCommentsLoading: true
    		});
    		var subCommentIDs = this.props.data.kids;
		    var subCommentsData = [];
		    var index = 0;
		    var _this = this;
		    function iterateAndFetch(){
		        if (index < subCommentIDs.length){
		            fetch(api.HN_ITEM_ENDPOINT+subCommentIDs[index]+".json")
		            .then((response) => response.json())
		            .then((item) => {
		                item.count = index+1;
		                subCommentsData.push(item);
		                index++;
		                iterateAndFetch();
		            })
		            .done();
		        }
		        else {
		            _this.setState({
		            	subCommentsLoading: false,
		            	subCommentsHidden: false,
		            	subCommentsData: subCommentsData
		            });
		            return;
		        }
		    }
		    iterateAndFetch();
		}
    }
});

module.exports = Comment;