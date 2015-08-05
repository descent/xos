import os
import pdb
import sys
import tempfile
sys.path.append("/opt/tosca")
from translator.toscalib.tosca_template import ToscaTemplate

from core.models import Slice,Sliver,User,Flavor,Node,Image
from nodeselect import XOSNodeSelector
from imageselect import XOSImageSelector

import resources

class XOSTosca(object):
    def __init__(self, tosca_yaml, parent_dir=None):
        # TOSCA will look for imports using a relative path from where the
        # template file is located, so we have to put the template file
        # in a specific place.
        if not parent_dir:
            parent_dir = os.getcwd()

        try:
            (tmp_handle, tmp_pathname) = tempfile.mkstemp(dir=parent_dir)
            os.write(tmp_handle, tosca_yaml)
            os.close(tmp_handle)

            self.template = ToscaTemplate(tmp_pathname)
        finally:
            os.remove(tmp_pathname)

        #pdb.set_trace()

    def execute(self, user):
        for nodetemplate in self.template.nodetemplates:
            self.execute_nodetemplate(user, nodetemplate)

    def execute_nodetemplate(self, user, nodetemplate):
        if nodetemplate.type in resources.resources:
            cls = resources.resources[nodetemplate.type]
            #print "work on", cls.__name__, nodetemplate.name
            obj = cls(user, nodetemplate)
            obj.create_or_update()

    def execute_nodetemplate(self, user, nodetemplate):
        if nodetemplate.type in resources.resources:
            cls = resources.resources[nodetemplate.type]
            #print "work on", cls.__name__, nodetemplate.name
            obj = cls(user, nodetemplate)
            obj.create_or_update()

    def destroy(self, user):
        models = []
        for nodetemplate in self.template.nodetemplates:
            if nodetemplate.type in resources.resources:
                cls = resources.resources[nodetemplate.type]
                obj = cls(user, nodetemplate)
                models = models + list(obj.get_existing_objs())
        models.reverse()
        for model in models:
            print "destroying", model
            model.delete(purge=True) # XXX change before deploying

