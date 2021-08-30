Contributing
============

1. **Please sign one of the contributor license agreements below.**
2. Fork the repo, develop and test your code changes, add docs.
3. Make sure that your commit messages clearly describe the changes.
4. Send a pull request.


Here are some guidelines for developing a Riversand App.


Using maven for build/test
--------------------------

After you clone the repository, use Maven for building and running the tests.

Integration tests run tests against real services and take a long time to run.
Consider `mvn install -DskipITs` to skip them when installing.
Maven 3.0+ is required.

It's also important to test that changes don't break compatibility with Riversand SDK's. 
End-to-end tests should ensure that Apps works when running on the Riversand Data Platform

**Please, do not use your production projects for executing integration tests.** While we do our best to make our tests independent of your project's state and content, they do perform create, modify and deletes, and you do not want to have your production data accidentally modified.

Adding Features
---------------
In order to add a feature to the App:

The feature must be fully documented using Javadoc and examples should be provided.
The feature must work fully on Java 8 and above.
The feature must not add unnecessary dependencies (where "unnecessary" is of course subjective,
but new dependencies should be discussed).

Coding Style
------------
Maintain the coding style in the project and in particular the modified files.
Follow the Riversand [Java Style Guide](https://riversand.atlassian.net/wiki/spaces/RP/pages/79757330/Java+Language+Style+Guide).

In pull requests, please run `mvn com.coveo:fmt-maven-plugin:format` to format your code diff.

## Contributor License Agreements


## Code of Conduct

Please note that this App should adhere to Contributor Code of Conduct. By participating in this you agree to abide by its terms. See [Code of Conduct][code-of-conduct] for more information.

[code-of-conduct]:https://github.com/riversandtechnologies/addon-app-template/tree/dev/CODE_OF_CONDUCT.md

