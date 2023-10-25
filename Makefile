all: up

up:
	docker-compose up --build

down:
	docker-compose down

fclean:
	docker-compose -f docker-compose.yml down \
	&&  docker system prune -a --force \
	&&  sudo rm -Rf ../VolumeTranscendance2/*

show:
	docker container ps -a

volume_show:
	docker volume ls

inspect:
	docker inspect postgresql | grep "IPAddress"

.PHONY: up down fclean show volume_show inspect