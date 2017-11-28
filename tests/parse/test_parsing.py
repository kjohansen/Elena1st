import unittest

from elena.parse.parser import *


class TestParsing(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.nodeStorage = parse("file_path")

    def test_parseCheck(self):
        self.assertEqual(len(self.nodeStorage.nodeMap), 45071)


if __name__ == '__main__':
    unittest.main()