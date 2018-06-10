// home page

var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery');
var chai = require('chai')
import { Provider,connect } from 'react-redux'

var {
        BooleanChoice,
        RadioChoices,
        TextField,
        ClickableButton,
        ProgressBar
    } = require('./editorComponents')
var {
        choices,
        choices_context,
        SFW,
        publishUrl,
        publishUrlText,
        userAuthenticated
    } = require('./applicationData')

import {
    moveCursorAction,
    setField
    } from './actionTypesAnswerEditor'

var log = require('./loggingConfig').CreateLogger("AnswerEdit")

//===============================================================================

const AboutPagePresentation = ({questions, navigationState }) => {
    log.info("AboutPage: navigationState",JSON.stringify(navigationState))

    let heading = <div>
            <div className="page-header">
                <h1>Welcome to the online BDSM checklist. <small>This is an interactive version of a checklist I found
                &nbsp;<a href="https://web.archive.org/web/20150128121457/http://www.cepemo.com/checklist.html">
                here</a>.</small></h1>
            </div>
             <br />
            I love this checklist, but found using it on paper cumbersome. For example, once filled
            out, I wanted a quick way to view all items marked 'love'.<br />
            All of the questions and instructions are blatently taken from there (I have been looking for the
            original author, if anyone knows who that is drop me an email through the link at the bottom of this page).
            <br />

            To fill out the checklist one must first create an account. It asks for name, email and password. Currently I don't do anything with the email address (don't even verify it), but someday it may be used to notify when a checklist has been viewed, or something). <br />

            The idea is that once you have filled it out you can share with others. There is no security to speak of, anyone can view anyone's answers. (but those answers are only associated with the username given, the email address is never released, and you can enter a bogus email address if you like, just be sure you don't lose the password in that case, if you want to be able to change your answers). <br />

            The username will be publicly viewable (when you share your results it shows your username), so select with that in mind. <br />

            There are some directions <a href="/checklist/instructions" >here</a>
        </div>
    if(SFW)
    {
        heading =
            <div>
                <div className="page-header">
                    <h1>Welcome to the online sports checklist. <small>It can be used to help people
                    interested in various sports match up with others of similar interest.
                    </small></h1>
                </div>
                You will need to create an account to see most of the site.
            </div>
    }

    let playground = null
    if(SFW)
    {
        playground =
            <div>
                <br /><br />
                A potential client recently asked me if I had a deployed site they could
                look at. Most of my recent work for hire projects are either not open
                the public, or are not yet deployed.
                So I deployed this so they would have something to look at.
                <br /><br />

                This is a small app I use to learn new technologies. It is a SFW version
                of a NSFW site I did for a local community. (so if it seems silly, it
                made more sense it its original context). The basic idea is: someone
                answers a lot of questions, then shares them with others to review.
                <br /><br />

                This app is implemented using Django. It began will all pages using django forms.
                Since then I have used it to experiment with a few technologies.
                <br />
                So the
                <a href="/checklist/questions/edit/">question editor</a> uses backbone.js. <br />
                The
                <a href="/checklist/edit/">answer editor</a> uses ReactJS. <br />

                both of those are communicating with the back end via a REST interface.

                <br />
                You need to be logged in to see the rest of the site. You can create
                an account, or login to a test account with the username 'test'
                and password of 'test'.
            </div>
    }

     let authUser = <div className="jumbotron">

             <br />To Create an account click on the register link on the upper right corner of the page
         </div>

    if(userAuthenticated)
    {
        authUser =
            <div className="jumbotron">
              <p>To use: The first step is to click the Fill out checklist button, and start answering questions.
              You do not have to answer all of the questions in a single sitting, but you do need to
              scroll to the bottom of the page and click submit to save what answered you have filled out.
              </p>
              <p>
              After saving a partially filled out checklist, you may resume by clicing "Resume checklist"
              to view only the questioms you have not answered yet.
              </p>
              <p>
                You may return at any time and edit your answers by clicking 'Fill out checklist' again.
              </p>
              <p>
                Once you have finished the questionaire, the "View Results" page can be used to display/print/download
                your answers. This page can also filter for certain results, as well as sort the results.
                To publish your results for anyone to be able to view, copy the following link:
                <a href="{ publishUrl }"> { publishUrlText } </a>
              </p>
            </div>
    }


    return (
        <div>
            { heading }

            <div className="jumbotron">
                For an example of what the results look like after filling out the
                form, you can view <a href="/checklist/view/1/" >mine</a>
            </div>

            { authUser }
            { playground }
        </div>
    )
}

//===============================================================================

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        navigationState: state.navigation,
    }
}

//-------------------------------------------------------------------------------

export const AboutPage = connect(
  mapStateToProps,
)(AboutPagePresentation)

//===============================================================================

