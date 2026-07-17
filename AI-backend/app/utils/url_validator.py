from urllib.parse import urlparse


ALLOWED_HOSTS = {
    "github.com",
    "www.github.com",
    "linkedin.com",
    "www.linkedin.com",
    "sivapothula.in",
    "www.sivapothula.in",
    "vercel.app",
    "onrender.com",
    "streamlit.app",
}


def is_safe_action_url(url: str) -> bool:

    if not url or not isinstance(url, str):
        return False

    try:
        parsed_url = urlparse(url.strip())

        if parsed_url.scheme != "https":
            return False

        if not parsed_url.hostname:
            return False

        hostname = parsed_url.hostname.lower()

        return (
            hostname in ALLOWED_HOSTS
            or hostname.endswith(".vercel.app")
            or hostname.endswith(".onrender.com")
            or hostname.endswith(".streamlit.app")
        )

    except Exception:
        return False