import os
import configparser

# util class
class Empty:
    pass

#------------------------------#
# CLASS : Configure
# Usage :
#   config = Configure()
#   # get value example, section:Screen, option:wdith
#   print(config.Screen.width)
#------------------------------#
class Config:
    def __init__(self, configFilename, debug = False):
        self.debug = debug
        self.filename = os.path.join(os.path.split(__file__)[0], configFilename)
        self.config = configparser.ConfigParser()
        self.config.optionxform = lambda option: option    # prevent the key value being lowercase
        self.config.read(self.filename)
        print("Load Config : %s" % self.filename)

        # set sections
        for section in self.config.sections():
            if self.debug:
                print("[%s]" % section)
            if not hasattr(self, section):
                setattr(self, section, Empty())
            current_section = getattr(self, section)
            # set values
            for option in self.config[section]:
                value = self.config.get(section, option)
                if self.debug:
                    print("%s = %s" % (option, value))
                setattr(current_section, option, value)

    def getValue(self, section, option):
        if not self.config.has_section(section):
            return ""
        return self.config[section][option]

    def setValue(self, section, option, value):
        # set value
        if not self.config.has_section(section):
            self.config.add_section(section)
        self.config[section][option] = str(value)

        # set internal method
        if not hasattr(self, section):
            setattr(self, section, Empty())
        current_section = getattr(self, section)
        setattr(current_section, option, value)
        self.__save()

    def __save(self):
        with open(self.filename, 'w') as configfile:
            self.config.write(configfile)
            print("Saved Config : " + self.filename)

    def getFilename(self):
        return self.filename

if __name__ == '__main__':
    import unittest

    # test
    class test(unittest.TestCase):
        def testConfig(self):
            # load test
            testConfig = Config("TestConfig.ini", debug=False)

            # set value
            testConfig.setValue("TestSection", "test_int", 45)

            # call test
            self.assertEqual(testConfig.getValue("TestSection", "test_int"), 45)

            # set value test
            testConfig.setValue("TestSection", "test_int", 99)
            self.assertEqual(testConfig.getValue("TestSection", "test_int"), 99)

    unittest.main()