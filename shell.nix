{ pkgs ? import <nixpkgs> {} }:

let
  mysqlClient =
    if pkgs ? mysql84 then pkgs.mysql84
    else if pkgs ? mysql80 then pkgs.mysql80
    else pkgs.mariadb.client;
in
pkgs.mkShell {
  packages = [
    pkgs.bun
    pkgs.nodejs_22
    pkgs.docker
    pkgs.docker-compose
    mysqlClient
    pkgs.git
    pkgs.nixpkgs-fmt
  ];

  shellHook = ''
    export NODE_ENV="development"
    export DB_HOST="127.0.0.1"
    export DB_PORT="3306"
    export DB_USERNAME="hr_user"
    export DB_PASSWORD="hr_password"
    export DB_DATABASE="hr_db"
    export BACKEND_PORT="4000"
    export FRONTEND_PORT="3000"
    export NEXT_PUBLIC_API_URL="http://localhost:4000/api"
    export INTERNAL_API_URL="http://127.0.0.1:4000/api"

    echo ""
    echo "============================================="
    echo "   HR Report Dev Environment Ready (NixOS)  "
    echo "   Runtime: Bun $(bun --version)            "
    echo "   Node:    $(node --version)               "
    echo "   Docker:  $(docker --version 2>/dev/null || echo 'not running') "
    echo "============================================="
    echo ""
  '';
}
