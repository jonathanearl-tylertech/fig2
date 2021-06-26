package mocks

import (
	pb "github.com/whattheearl/fig/pkg/postpb"
)

// requests
func MockPostIdRequest() *pb.PostIdRequest {
	return &pb.PostIdRequest{
		Id: "701d05c9-8795-4e64-b745-88159fc52d58",
	}
}

func MockQueryRequest() *pb.QueryRequest {
	return &pb.QueryRequest{
		ProfileId: "e99ed385-10de-4536-9e24-06d800454a1f",
	}
}

func MockCreatePostRequest() *pb.CreatePostRequest {
	return &pb.CreatePostRequest{
		Id:       "0779a34e-8d9a-4b68-81a2-5d7ed5118eb3",
		Message:  "Created this thang!",
		Image:    "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=c4f4d4981ad8e828c7d2402a47ed4f4f",
		Authorid: "e99ed385-10de-4536-9e24-06d800454a1f",
	}
}

// responses
func MockSinglePostResponse() *pb.PostResponse {
	return &pb.PostResponse{
		Result: []*pb.Result{MockResult()},
		Cursor: "59c7eff2-2c92-44e7-9d28-e19992d8a891",
		Count:  1,
	}
}

func MockMultiplePostResponse() *pb.PostResponse {
	r := []*pb.Result{}
	for i := 0; i < 30; i++ {
		r = append(r, MockResult())
	}

	return &pb.PostResponse{
		Result: r,
		Cursor: "59c7eff2-2c92-44e7-9d28-e19992d8a891",
		Count:  1,
	}
}

func MockResult() *pb.Result {
	return &pb.Result{
		Id:       "701d05c9-8795-4e64-b745-88159fc52d58",
		Message:  "This is the song that never ends...",
		Image:    "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
		Authorid: "e99ed385-10de-4536-9e24-06d800454a1f",
	}
}
