<?php 
include('header.php'); 
$page = 'messages';
// echo '<pre>';
// var_dump($_SERVER['QUERY_STRING']);
// echo '</pre>';

// $POST['query_string'] = $_SERVER['QUERY_STRING'];
// var_dump($POST)
?>

  <div class="container-fluid">
    <form role="form" action="submit.php" method="post">
        
        <br><label> What is the status of this project?</label>
        <div class="radio">
          <label><input type="radio" name="question0" value="Finished"> The project is finished</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="Progress">The project is in progress</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="Slow progress">The progress is running slowly</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="No progress">I dont see any progress made</label>
        </div>


        <label> How satisfied are you with the progress of this project?</label>
        <div class="radio">
          <label><input type="radio" name="question1" value="Extremely satisfied">Extremely satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Satisfied">Satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Average">Average</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Dissatisfied">Dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Extremely dissatisfied">Extremely dissatisfied</label>
        </div>

<!-- <hr> -->
        <label> Are the results of the project visible?</label>
        <div class="radio">
          <label><input type="radio" name="question2" value="Clearly visible results">The results are clearly visible</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Somewhat visible results">The results are somewhat visible</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Results not visible">The results are not visible at all</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Project isn't finished yet">The project is not yet finished</label>
        </div>


      <label>Is there anything we can improve concerning this project?</label>
      <div class="form-group">
        <input class="form-control input-lg" name="question3" id="inputlg" type="text">
      </div>

        <label> The information on the detail page is:</label>
        <div class="radio">
          <label><input type="radio" name="question4" value="Great">Great</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question4" value="Ample">Ample</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question4" value="Sufficient">Sufficient</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question4" value="Somewhat poor">Somewhat poor</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question4" value="Poor">Poor</label>
        </div>

       <center>
          <button type="submit" class="btn btn-primary submit-btn">Submit form</button>
       </center> 

    </form>
  </div>
 
<?php
include('footer.php');
?>