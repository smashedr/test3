local Pipeline(name, image) = {
  kind: "pipeline",
  name: name,
  steps: [
    {
      name: "test",
      image: image,
      commands: [
        "python -m pip install -U pip",
        "python -m pip install -Ur requirements.txt",
        "django-admin --version"
      ]
    }
  ]
};

[
  Pipeline("python-3-5", "python:3.5"),
  Pipeline("python-3-6", "python:3.6"),
  Pipeline("python-3-7", "python:3.7"),
  Pipeline("python-3-8", "python:3.8"),
  Pipeline("python-3-9", "python:3.9"),
  Pipeline("python-3-10", "python:3.10"),
  Pipeline("python-3-11", "python:3.11"),
]
