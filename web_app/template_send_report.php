<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
<script type="text/javascript" src="scripts/spin.js">
</script>
<script type="text/javascript" src="scripts/spin.min.js"></script>
<script type="text/javascript" src="scripts/sweetalert.min.js"></script>
<script type="text/javascript" src="scripts/send_report.js"></script>

<label class="blackLabel">Subject:</label>
<br>
<br>
<textarea name="title" cols="60" rows="3" maxlength="200" id="title" onKeyPress="enterSendReport(event)"></textarea>
<br>
<br>
<br>
<label class="blackLabel">Problem description:</label>
<br>
<br>
<textarea name="problem" cols="60" rows="5" maxlength="2000" id="problem" onKeyPress="enterSendReport(event)"></textarea>
<br>
<br>
<br>
<button class="centerButtonWide" onClick="sendReport()">Add comment</button>
<br>