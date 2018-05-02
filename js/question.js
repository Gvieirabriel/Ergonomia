var quiz = [
	        {
	            "question"      :   "1 - Qual é o resultado da soma a seguir em Binários?",
	            "image"         :   "./img/image5.png",
	            "choices"       :   [
	                                    "1 1 1 1 1 1 1 0",
	                                    "0 0 0 1 0 0 1 0",
	                                    "0 0 0 1 1 1 1 0",
	                                    "0 0 0 0 0 0 0 1",
	                                ],
	            "correct"       :   "0 0 0 1 1 1 1 0",
	            "explanation"   :   "",
	        },
	        {
	            "question"      :   "2 - Qual é o resultado da subtração a seguir em Binários?",
	            "image"         :   "./img/image1.png",
	            "choices"       :   [
	                                    "1 0 0 0 ",
	                                    "1 1 0 1 0",
	                                    "1 0 0 1",
	                                    "1 0 1 0"
	                                ],
	            "correct"       :   "1 0 1 0",
	            "explanation"   :   "",
	        },
	        {
	            "question"      :   "3 - Qual é o resultado da multiplicação a seguir em Binários?",
	            "image"         :   "./img/image4.png",
	            "choices"       :   [
	                                    "1 0 0 0 0 0",
	                                    "1 1 1 0 1 1",
	                                    "1 0 0 1 0 1",
	                                    "1 0 0 0 0 1"
	                                ],
	            "correct"       :   "1 0 0 0 0 1",
	            "explanation"   :   "",
	        },
	        {
	            "question"      :   "4 - Qual é o resultado da divisão a seguir em Binários?",
	            "image"         :   "./img/image2.png",
	            "choices"       :   [
	                                    "1 1 1 1 1 1",
	                                    "1 0 0 1",
	                                    "1 0 1 1",
	                                    "1 1 1 1"
	                                ],
	            "correct"       :   "1 0 1 1",
	            "explanation"   :   "",
	        },
	        {
	            "question"      :   "5 - Qual Sistema matemático foi essencial para desenvolvimento do sistema Binário?",
	            "image"         :   "./img/image3.png",
	            "choices"       :   [
	                                    "Geométrico",
	                                    "Aritmético",
	                                    "Cartesiano",
	                                    "Booleano"
	                                ],
	            "correct"       :   "Booleano",
	            "explanation"   :   "",
	        },
	    ];
	    
	    /******* No need to edit below this line *********/
	    var currentquestion = 0, score = 0, submt=true, picked;
	    jQuery(document).ready(function($){
	        /**
	         * HTML Encoding function for alt tags and attributes to prevent messy
	         * data appearing inside tag attributes.
	         */
	        function htmlEncode(value){
	          return $(document.createElement('div')).text(value).html();
	        }
	        /**
	         * This will add the individual choices for each question to the ul#choice-block
	         *
	         * @param {choices} array The choices from each question
	         */
	        function addChoices(choices){
	            if(typeof choices !== "undefined" && $.type(choices) == "array"){
	                $('#choice-block').empty();
	                for(var i=0;i<choices.length; i++){
	                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
	                }
	            }
	        }
	        
	        /**
	         * Resets all of the fields to prepare for next question
	         */
	        function nextQuestion(){
	            submt = true;
	            $('#explanation').empty();
	            $('#question').text(quiz[currentquestion]['question']);
	            $('#pager').text('Questões ' + Number(currentquestion + 1) + ' de ' + quiz.length);
	            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
	                if($('#question-image').length == 0){
	                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
	                } else {
	                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
	                }
	            } else {
	                $('#question-image').remove();
	            }
	            addChoices(quiz[currentquestion]['choices']);
	            setupButtons();
	        }
	        /**
	         * After a selection is submitted, checks if its the right answer
	         *
	         * @param {choice} number The li zero-based index of the choice picked
	         */
	        function processQuestion(choice){
	            if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
	                $('.choice').eq(choice).css({'background-color':'#b3ffb3'});
	                $('#explanation').html('<strong>Correto!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
	                score++;
	            } else {
	                $('.choice').eq(choice).css({'background-color':'#ffb3b3'});
	                $('#explanation').html('<strong>Errado!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
	            }
	            currentquestion++;
	            $('#submitbutton').html('Próxima Questão').on('click', function(){
	                if(currentquestion == quiz.length){
	                    endQuiz();
	                } else {
	                    $(this).text('Ver resposta').css({'color':'#fff'}).off('click');
	                    nextQuestion();
	                }
	            })
	        }
	        /**
	         * Sets up the event listeners for each button.
	         */
	        function setupButtons(){
	            $('.choice').on('mouseover', function(){
	                $(this).css({'background-color':'#e1e1e1'});
	            });
	            $('.choice').on('mouseout', function(){
	                $(this).css({'background-color':'#fff'});
	            })
	            $('.choice').on('click', function(){
	                picked = $(this).attr('data-index');
	                $('.choice').removeAttr('style').off('mouseout mouseover');
	                $(this).css({'border-color':'#fff','font-weight':700,'background-color':'#c1c1c1'});
	                if(submt){
	                    submt=false;
	                    $('#submitbutton').css({'color':'#fff'}).on('click', function(){
	                        $('.choice').off('click');
	                        $(this).off('click');
	                        processQuestion(picked);
	                    });
	                }
	            })
	        }
	        
	        /**
	         * Quiz ends, display a message.
	         */
	        function endQuiz(){
	            $('#explanation').empty();
	            $('#question').empty();
	            $('#choice-block').empty();
	            $('#submitbutton').remove();
	            $('#question-image').remove();
	            $('#question').text("Você acertou " + score + " de " + quiz.length + " questões.");
	            
	            const scriptURL = 'https://script.google.com/macros/s/AKfycby9u4b1fzPAwqA71TdqS_XPAFExBhS1DgPpr2CaDVDQD7L0cmY/exec'
  				const form = document.forms['submit-to-google-sheet']

	            document.getElementById("acertos").value = score;

	             fetch(scriptURL, { method: 'POST', body: new FormData(form)})
			      .then(response => console.log('Success!', response))
			      .catch(error => console.error('Error!', error.message))

	            $('#pager').remove();
	        }
	        /**
	         * Runs the first time and creates all of the elements for the quiz
	         */
	        function init(){
	            //add pager and questions
	            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
	                //add first question
	                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
	                //add image if present
	                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
	                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
	                }
	                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');
	            
	                //questions holder
	                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
	            
	                //add choices
	                addChoices(quiz[0]['choices']);
	            
	                //add submit button
	                $(document.createElement('div')).addClass('choice-box btn-info').attr('id', 'submitbutton').text('Ver resposta').css({'font-weight':800,'color':'#FFF','padding':'20px 0'}).appendTo('#frame');
	            	
	               	//add pager
	                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Questão 1 de ' + quiz.length).appendTo('#frame');

	                setupButtons();
	            }
	        }
	        
	        init();
	    });

function activityAdditionGenerate() {
  var randomNumber1 = Math.floor((Math.random() * 51)) + 20;
  var randomNumber2 = Math.floor((Math.random() * 51)) + 10;

  $('#additionactivity').text(randomNumber1.toString(2) + ' + ' + randomNumber2.toString(2));

  $('#additionanswer').hide().text((randomNumber1 + randomNumber2).toString(2) + ' ( ' + (randomNumber1 + randomNumber2) + ' )');
}

function additionShow() {
  $('#additionanswer').show();
}

function activityMultiplicationGenerate() {
  var randomNumber1 = Math.floor((Math.random() * 11)) + 20;
  var randomNumber2 = Math.floor((Math.random() * 7)) + 1;

  $('#multiplicationactivity').text(randomNumber1.toString(2) + ' x ' + randomNumber2.toString(2));

  $('#multiplicationanswer').hide().text((randomNumber1 * randomNumber2).toString(2) + ' ( ' + (randomNumber1 * randomNumber2) + ' )');
}

function multiplicationShow() {
  $('#multiplicationanswer').show();
}

function activitySubtractionGenerate() {
  var randomNumber1 = Math.floor((Math.random() * 50)) + 30;
  var randomNumber2 = Math.floor((Math.random() * 20)) + 10;

  $('#subtractionactivity').text(randomNumber1.toString(2) + ' - ' + randomNumber2.toString(2));

  $('#subtractionanswer').hide().text((randomNumber1 - randomNumber2).toString(2) + ' ( ' + (randomNumber1 - randomNumber2) + ' )');
}

function subtractionShow() {
  $('#subtractionanswer').show();
}

function activityDivisionGenerate() {
  var randomNumber1 = Math.floor((Math.random() * 30)) + 10;
  var randomNumber2 = Math.floor((Math.random() * 5)) + 2;

  var remainder = randomNumber1 % randomNumber2;
  var answer = (randomNumber1 - remainder) / randomNumber2;

  $('#divisionactivity').text(randomNumber1.toString(2) + ' / ' + randomNumber2.toString(2));

  $('#divisionanswer').hide().text(answer.toString(2) + ' ( ' + Math.floor(randomNumber1 / randomNumber2) + ' e sobra ' + remainder.toString(2) + ' )');
}

function divisionShow() {
  $('#divisionanswer').show();
}

function generateAll() {
  activityAdditionGenerate();
  activityMultiplicationGenerate();
  activitySubtractionGenerate();
  activityDivisionGenerate();
}