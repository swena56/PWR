class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            loading: false,
            solved: false,
            error: false,
            shaking: false,
        };
        
        this.focus = this.focus.bind(this);
        this.handleInputButton = this.handleInputButton.bind(this);   
    }
   
    componentDidMount(){
        this.focus();
    }

    focus() {
        this.textInput.focus();
    }

    handleKeyDown(event){
        this.focus();

        switch( event.key ) {
            case 'Enter':
                this.solve();
                break;
            case 'Backspace':
                this.backspace();
                break;
            case 'Escape':
                this.clear();
                break;
            default:

                //check if valid input
                if( event.key.length == 1 && ! event.key.match(/[a-z]/i) ){
                //if( event.key.length == 1 ){
                    this.setState({
                        input: this.state.input + event.key
                    });

                      if( this.isValidInput() ){
                        this.setState({error:false, shaking: false});
                    } else {
                        setTimeout(function() { this.solve(true); }.bind(this), 3000);  
                    }  
                }
                
                break;
        }
    }


    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    clear(){
        this.setState({
                input: '',
                error: false,
        });
    }

    backspace(){
        var content = this.state.input;

        if( ! content || content.length == 1 ){
            this.clear();
            return;
        }

        var backspace_one = content.substring(0, content.length - 1) || '';

        this.setState({
                input: backspace_one
        });


        if( this.isValidInput() ){
            this.setState({error:false, shaking: false});
        } else {
            setTimeout(function() { this.solve(true); }.bind(this), 3000);  
        }

        
    }

    handleInputButton(event){
        
        if( this.state.solved ){
            this.clear();
        }

        if( ! this.state.loading ){

            this.setState({loading:true});
            event.preventDefault();
            var value = event.target.innerHTML;

            if( event.target.id == "clear" ){
                this.clear();
            } else if( event.target.id == "other" ) {
                this.setState({
                    input: this.state.input + value,
                    solved: true,
                });

            } else if( event.target.id == "solve" ) {
                this.solve();
            } else {
                this.setState({input:(this.state.input + value)});
            }

            this.focus();
            
            if( this.isValidInput() ){
                this.setState({error:false, shaking: false});
            } else {
                setTimeout(function() { this.solve(true); }.bind(this), 3000);  
            } 
            this.setState({loading:false});
        }
    }

    isValidInput(){
         
        try {
            if( this.state.input ){
                math.eval(this.state.input);
            }
        }
        catch(err) {
            return false;
        }

        return true;
    }

    solve(check=false){

        var equation = this.state.input;
        var answer = null;
        try {
            answer = math.eval(equation);

            if( check ){
                this.setState({error:false, shaking: false});
            }
        }
        catch(err) {
            answer = "ERROR";
            answer = equation;
            this.setState({error:true, shaking: true});
            setTimeout(function() { this.setState({shaking: false}); }.bind(this), 1000);
        }

        if( ! check ){
            this.setState({input:answer});
        }
        
    }

    render() {

        var box_style = {
          boxModel: 'border-box',
          border: '3px solid transparent',
          backgroundClip:'padding-box',
        };

        return (
<div className="container border border-dark">
  <br/>

    <div className={"form-group " + (this.state.shaking ? 'animated infinite shake' : '' )} style={{borderColor : (this.state.error ? 'red' : 'black') }} >
        <input type="text" className={"form-control " + (this.state.error ? 'is-invalid' : 'is-valid' )} value={this.state.input} style={{color : (this.state.error ? 'red' : 'black') }} ref={(input) => { this.textInput = input; }}
        />
        <i className="fa fa-backward" onClick={ () => this.backspace() }></i>
    </div>

<div className="row">
<div className="col-md-3 box">
  <button id="clear" onClick={this.handleInputButton} type="button" className="calc btn btn-primary btn-lg">Clear</button>
</div>
<div className="col-md-3 box"></div>
<div className="col-md-3 box">
  <button id="other" disabled onClick={this.handleInputButton} type="button" className="calc btn btn-info btn-lg">%</button>
</div>
<div className="col-md-3 box">
  <button id="other" onClick={this.handleInputButton} type="button" className="calc btn btn-info btn-lg">&#247;</button>
</div>
</div>
<div className="row">
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">7</button>
</div>
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">8</button>
</div>
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">9</button>
</div>
<div className="col-md-3 box">
  <button id="other" onClick={this.handleInputButton} type="button" className="calc btn btn-info btn-lg">*</button>
</div>
</div>
<div className="row">
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">4</button>
</div>
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">5</button>
</div>
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">6</button>
</div>
<div className="col-md-3 box">
  <button id="other" onClick={this.handleInputButton} type="button" className="calc btn btn-info btn-lg">-</button>
</div>
</div>
<div className="row">
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">1</button>
</div>
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">2</button>
</div>
<div className="col-md-3 box">
  <button id="number" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">3</button>
</div>
<div className="col-md-3 box">
  <button id="other" onClick={this.handleInputButton} type="button" className="calc btn btn-info btn-lg">+</button>
</div>
</div>
<div className="row">
<div className="col-md-6 box">
  <button id="other" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">0</button>
</div>
<div className="col-md-3 box">
  <button id="other" onClick={this.handleInputButton} type="button" className="calc btn btn-secondary btn-lg">.</button>
</div>
<div className="col-md-3 box">
  <button id="solve" onClick={this.handleInputButton} type="button" className="calc btn btn-info btn-lg">=</button>
</div>

</div>
<br/>
</div>
        );
    }
}

ReactDOM.render(<Calculator />, document.querySelector('#calculator'))