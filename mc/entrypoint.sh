#! /bin/bash
echo 'sleeping 3s';
sleep 3s;

echo 'configure cli'
mc config host add fig http://minio:9000 minioadmin minioadmin;

echo 'create staged bucket';
mc mb fig/staged;
