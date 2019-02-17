from __future__ import absolute_import, print_function

from flask import Flask, render_template, request
from jinja2 import Environment, meta, exceptions
from random import choice
from inspect import getmembers, isfunction
from cgi import escape
import logging
import logging.handlers
import json
import yaml
import config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

def get_custom_filters():
    import filters
    custom_filters = {}
    for m in getmembers(filters):
        if m[0].startswith('filter_') and isfunction(m[1]):
            filter_name = m[0][7:]
            custom_filters[filter_name] = m[1]

    return custom_filters


@app.route("/")
def home():
    return render_template('index.html', token="Flask is running" ,custom_filters=get_custom_filters())



@app.route('/convert', methods=['GET', 'POST'])
def convert():
    
    jinja2_env = Environment()


    #Load custom filters
    # custom_filters = get_custom_filters()
    # app.logger.debug('Add the following customer filters to Jinja environment: %s' % ', '.join(custom_filters.keys()))
    # jinja2_env.filters.update(custom_filters)



    json_request = request.get_json(force=True)

    print(json_request)

    # print(request.form['template'])
    if request.method == "POST":
    # Load the template
    
        try:
          
            jinja2_tpl = jinja2_env.from_string(json_request['request_info']['template'])
           
            #return rendered_jinja2_tpl

           
           
        except (exceptions.TemplateSyntaxError, exceptions.TemplateError) as e:
            print("asdf")
            return "Syntax error in jinja2 template: {0}".format(e)


        dummy_values = [ 'Lorem', 'Ipsum', 'Amet', 'Elit', 'Expositum',
            'Dissimile', 'Superiori', 'Laboro', 'Torquate', 'sunt',
        ]
       
        values = {}
        if bool(int(json_request['request_info']['showwhitespaces'])):
            # List template variables (introspection)
            vars_to_fill = meta.find_undeclared_variables(jinja2_env.parse(json_request['request_info']['template']))

            for v in vars_to_fill:
                values[v] = choice(dummy_values)
        else:
            # Check JSON for errors
            if json_request['request_info']['input_type'] == "json":
                try:
                    values = json_request['request_info']['values']
                except ValueError as e:
                    return "Value error in JSON: {0}".format(e)
  

        # If ve have empty var array or other errors we need to catch it and show
        try:
            rendered_jinja2_tpl = jinja2_tpl.render(values)
            print(rendered_jinja2_tpl)
        except (exceptions.TemplateRuntimeError, ValueError, TypeError) as e:
            return "Error in your values input filed: {0}".format(e)


        print(json_request['request_info']['showwhitespaces'])
        if bool(int(json_request['request_info']['showwhitespaces'])):
            # Replace whitespaces with a visible character (will be grayed with javascript)
            rendered_jinja2_tpl = rendered_jinja2_tpl.replace(' ', u'•')
        
    

        return escape(rendered_jinja2_tpl).replace('\n', '<br />')
        
       


if __name__ == "__main__":
    # Set up logging
    app.logger.setLevel(logging.__getattribute__(config.LOGGING_LEVEL))
    file_handler = logging.handlers.RotatingFileHandler(filename=config.LOGGING_LOCATION, maxBytes=10*1024*1024, backupCount=5)
    file_handler.setFormatter(logging.Formatter(config.LOGGING_FORMAT))
    file_handler.setLevel(logging.__getattribute__(config.LOGGING_LEVEL))
    app.logger.addHandler(file_handler)

    app.run(
        host=config.HOST,
        port=config.PORT,
        debug=config.DEBUG,
)