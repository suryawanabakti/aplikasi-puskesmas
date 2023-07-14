<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        if (Cache::has('user-is-online-' . $this->id)) {
            $status = true;
        } else {
            $status = false;
        }

        return [
            "uuid" => $this->uuid,
            "name" => $this->name,
            "email" => $this->email,
            "position" => $this->roles[0]->name,
            "last_seen" => Carbon::parse($this->last_seen)->diffForHumans(),
            "status" => $status
        ];
    }
}
